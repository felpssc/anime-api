import { hashSync } from "bcrypt";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
	constructor(
		@inject("UsersRepository")
    private usersRepository: IUsersRepository
	) {}

	async execute({ name, email, password, avatar, birth_date }: ICreateUserDTO): Promise<void> {
		const userAlreadyExists = await this.usersRepository.findByEmail(email);

		if (userAlreadyExists) {
			throw new AppError("User already exists.");
		}

		await this.usersRepository.create({
			name,
			email,
			password: hashSync(password, 8),
			avatar,
			birth_date
		});
	}
}

export { CreateUserUseCase };