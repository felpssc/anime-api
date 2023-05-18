import { inject, injectable } from "tsyringe";
import { ICharactersRepository, IListCharactersFilters, IListCharactersResponse } from "../../repositories/ICharactersRepository";

@injectable()
class ListCharactersUseCase {

	constructor(
    @inject("CharactersRepository")
    private charactersRepository: ICharactersRepository
	) {}

	async execute(filters: IListCharactersFilters): Promise<IListCharactersResponse> {
		const characters = await this.charactersRepository.list(filters);

		return characters;
	}
}

export { ListCharactersUseCase };