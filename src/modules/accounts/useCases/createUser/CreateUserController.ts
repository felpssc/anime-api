import { Request, Response } from "express";
import { container } from "tsyringe";
import { IController } from "../../../../core/Controller/IController";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController implements IController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { email, name, password, avatar, birth_date }: ICreateUserDTO = request.body;

		const createUserUseCase = container.resolve(CreateUserUseCase);

		await createUserUseCase.execute({
			name,
			email,
			password,
			avatar,
			birth_date
		});

		return response.status(201).send();
	}
}

export { CreateUserController };