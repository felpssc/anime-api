import { AppError } from "../../../../shared/errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/inMemory/UsersRepositoryInMemory";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";

let usersRepository: IUsersRepository;
let createUserUseCase: CreateUserUseCase;

describe("CreateUserUseCase", () => {
	beforeEach(() => {
		usersRepository = new UsersRepositoryInMemory();
		createUserUseCase = new CreateUserUseCase(usersRepository);
	});

	it("Should be able to create a new user.", async () => {
		const user: ICreateUserDTO = {
			name: "user1",
			email: "user1@email.com",
			password: "12345"
		};

		await createUserUseCase.execute(user);

		const wasUserCreated = await usersRepository.findByEmail(user.email);

		expect(wasUserCreated).toHaveProperty("id");
	});

	it("Should not be able to create a new user with existent email address", async () => {
		const user: ICreateUserDTO = {
			name: "user1",
			email: "user1@email.com",
			password: "12345"
		};

		await createUserUseCase.execute(user);

		await expect(createUserUseCase.execute(user))
			.rejects.toEqual(new AppError("User already exists."));
	});
});