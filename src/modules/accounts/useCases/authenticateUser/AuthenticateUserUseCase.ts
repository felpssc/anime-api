import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import auth from "../../../../config/auth";

import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

interface IResponse {
  user: {
    name: string,
    email: string,
  },
  token: string
}

@injectable()
class AuthenticateUserUseCase {

	constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
	) {}

	async execute({ email, password }): Promise<IResponse> {
		const user = await this.usersRepository.findByEmail(email, {
			includePassword: true
		});

		if (!user) {
			throw new AppError("Incorrect email or password.", 401);
		}

		const passwordMatched = await compare(password, user.password);

		if (!passwordMatched) {
			throw new AppError("Incorrect email or password.", 401);
		}

		const token = jwt.sign({
			user: {
				email: user.email
			}
		}, auth.secret_token, {
			subject: user.id,
			expiresIn: auth.expires_in_token
		});

		return {
			user: {
				name: user.name,
				email: user.email
			},
			token
		};
	}
}

export { AuthenticateUserUseCase };