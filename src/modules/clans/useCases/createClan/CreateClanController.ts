import { Request, Response } from "express";
import { container } from "tsyringe";
import { IController } from "../../../../core/Controller/IController";
import { ICreateClanDTO } from "../../dtos/ICreateClanDTO";
import { CreateClanUseCase } from "./CreateClanUseCase";

class CreateClanController implements IController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { name, icon, link }: ICreateClanDTO = request.body;

		const createClanUseCase = container.resolve(CreateClanUseCase);

		await createClanUseCase.execute({ name, icon, link });

		return response.status(201).send();
	}
}

export { CreateClanController };