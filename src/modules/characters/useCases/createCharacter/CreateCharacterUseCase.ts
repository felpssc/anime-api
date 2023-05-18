import { inject, injectable } from "tsyringe";
import { ICreateCharacterDTO } from "../../dtos/ICreateCharacterDTO";
import { ICharactersRepository } from "../../repositories/ICharactersRepository";

@injectable()
class CreateCharacterUseCase {
	constructor(
    @inject("CharactersRepository")
    private charactersRepository: ICharactersRepository
	) {}

	async execute(data: ICreateCharacterDTO) {
		const character = await this.charactersRepository.create(data);

		return character;
	}
}

export { CreateCharacterUseCase };