import { ICreateCharacterDTO } from "../../dtos/ICreateCharacterDTO";
import { Character } from "../../infra/typeorm/entities/Character";
import { ICharactersRepository, IListCharactersFilters, IListCharactersResponse } from "../ICharactersRepository";

class CharactersRepositoryInMemory implements ICharactersRepository {
	
	characters: Character[] = [];
  
	async create(data: ICreateCharacterDTO): Promise<Character> {
		const character = new Character();

		Object.assign(character, data);

		this.characters.push(character);

		return character;
	}

	async list({ offset, limit, name, gender, clan }: IListCharactersFilters): Promise<IListCharactersResponse> {
		let characters: Character[];

		if (name || gender || clan) {
			characters = this.characters.filter(character => {
				if (name && character.name !== name) return false;
				if (gender && JSON.parse(character.info).gender !== gender) return false;
				if (clan && JSON.parse(character.info).clan !== clan) return false;
				return true;
			});
		}

		if (offset) {
			characters = characters.slice(0, offset);
		}

		if (limit) {
			characters = characters.slice(0, limit);
		}

		return {
			characters,
			count: characters.length
		};
	}

}

export { CharactersRepositoryInMemory };