import { AppError } from "../../../../shared/errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../infra/typeorm/entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

class CreateUserUseCase {
	constructor(
    private usersRepository: IUsersRepository
	) {}

	async execute({ name, email, password }: ICreateUserDTO): Promise<User> {
		const userAlreadyExists = await this.usersRepository.findByEmail(email);

		if (userAlreadyExists) {
			throw new AppError("User already exists.");
		}

		const user = await this.usersRepository.create({
			name,
			email,
			password
		});

		return user;
	}
}

export { CreateUserUseCase };