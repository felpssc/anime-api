import { Request, Response } from "express";
import { container } from "tsyringe";
import { IController } from "../../../../core/Controller/IController";
import { IListClansFilters } from "../../repositories/IClansRepository";
import { ListClansUseCase } from "./ListClansUseCase";

class ListClansController implements IController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { limit, name, offset }: IListClansFilters = request.query;

		const findClanByNameUseCase = container.resolve(ListClansUseCase);

		const clans = await findClanByNameUseCase.execute({
			limit,
			name,
			offset,
		});

		return response.json(clans);
	}
}

export { ListClansController };