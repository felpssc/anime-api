import { Request, Response } from "express";
import { container } from "tsyringe";
import { IController } from "../../../../core/Controller/IController";
import { ICreateCharacterDTO } from "../../dtos/ICreateCharacterDTO";
import { CreateCharacterUseCase } from "./CreateCharacterUseCase";

class CreateCharacterController implements IController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { 
			name,
			page,
			clan_id,
			about,
			info,
			images
		}: ICreateCharacterDTO = request.body;

		const createCharacterUseCase = container.resolve(CreateCharacterUseCase);

		const character = await createCharacterUseCase.execute({
			name,
			page,
			clan_id,
			about,
			info,
			images
		} as ICreateCharacterDTO); 

		return response.status(201).json(character);
	}
}

export {  CreateCharacterController };