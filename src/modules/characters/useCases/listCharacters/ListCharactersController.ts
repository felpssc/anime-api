import { Request, Response } from "express";
import { container } from "tsyringe";
import { IController } from "../../../../core/Controller/IController";
import { IListCharactersFilters } from "../../repositories/ICharactersRepository";
import { ListCharactersUseCase } from "./ListCharactersUseCase";

class ListCharactersController implements IController {
	async handle(request: Request, response: Response): Promise<Response> {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const { offset, limit, name, clan, gender }: IListCharactersFilters = request.query as any;

		const listCharactersUseCase = container.resolve(ListCharactersUseCase);

		const characters = await listCharactersUseCase.execute({
			offset,
			limit,
			name,
			clan,
			gender,
		});

		return response.json(characters);
	}

}

export { ListCharactersController };