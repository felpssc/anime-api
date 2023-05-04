import { AppError } from "../../../../shared/errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/inMemory/UsersRepositoryInMemory";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let usersRepository: IUsersRepository;
let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;

describe("AuthenticateUserUseCase", () => {
	beforeEach(() => {
		usersRepository = new UsersRepositoryInMemory();
		createUserUseCase = new CreateUserUseCase(usersRepository);
		authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository);
	});

	it("Should be able to authenticate a user with jwt token", async () => {
		const user: ICreateUserDTO = {
			name: "user1",
			email: "user1@email.com",
			password: "12345"
		};

		const { email, password } = user;

		await createUserUseCase.execute(user);

		const auth = await authenticateUserUseCase.execute({ email, password });

		expect(auth).toHaveProperty("token");
	});

	it("Should not be able to authenticate an user with wrong credentials", async () => {
		const user: ICreateUserDTO = {
			name: "user1",
			email: "user1@email.com",
			password: "12345"
		};

		const { email } = user;

		await createUserUseCase.execute(user);

		await expect(authenticateUserUseCase.execute({ email, password: "WRONG_PASS" }))
			.rejects.toEqual(new AppError("Incorrect email or password.", 401));
	});
});