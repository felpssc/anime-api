import { inject, injectable } from "tsyringe";
import { ICreateCharacterDTO } from "../../dtos/ICreateCharacterDTO";
import { ICharactersRepository } from "../../repositories/ICharactersRepository";
import { IClansRepository } from "../../../clans/repositories/IClansRepository";
import { AppError } from "../../../../shared/errors/AppError";

@injectable()
class CreateCharacterUseCase {
	constructor(
    @inject("CharactersRepository")
    private charactersRepository: ICharactersRepository,
		@inject("ClansRepository")
		private clansRepository: IClansRepository
	) {}

	async execute(data: ICreateCharacterDTO) {
		if (data.clan_id) {
			const clan = await this.clansRepository.findById(data.clan_id);

			if (!clan) {
				throw new AppError("Clan does not exists");
			}
		}

		const character = await this.charactersRepository.create(data);

		return character;
	}
}

export { CreateCharacterUseCase };