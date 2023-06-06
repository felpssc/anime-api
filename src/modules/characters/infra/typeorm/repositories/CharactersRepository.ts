import { Repository } from "typeorm";
import { AppDataSource } from "../../../../../shared/infra/typeorm/data-source";
import { ICreateCharacterDTO } from "../../../dtos/ICreateCharacterDTO";
import { ICharactersRepository, IListCharactersFilters, IListCharactersResponse } from "../../../repositories/ICharactersRepository";
import { Character } from "../entities/Character";
import { defaultClanId } from "../../../../../config/clan";

class CharactersRepository implements ICharactersRepository {
	
	private repository: Repository<Character>;

	constructor() {
		this.repository = AppDataSource.getRepository(Character);
	}
  
	async create(data: ICreateCharacterDTO): Promise<Character> {

		if (!data.clan_id) {
			data.clan_id = defaultClanId;
		}

		const character = this.repository.create(data);

		await this.repository.save(character);

		return character;
	}

	async list({ offset, limit, clan, gender, name }: IListCharactersFilters): Promise<IListCharactersResponse> {
		const query = this.repository.createQueryBuilder("characters");

		if (name) {
			query.where("characters.name ILIKE :name", { name: `%${name}%` });
		}

		if (clan) {
			query.where("characters.clan_id = :clan", { clan });
		}

		if (gender) {
			query.where(`characters.info ::jsonb ->> 'Sexo' ILIKE '%${gender}%'`);
		}

		if  (offset) {
			query.offset(offset);
		}

		if (limit) {
			query.limit(limit);
		}

		query.leftJoinAndSelect("characters.clan", "clans");

		const [ characters, count ] = await query.getManyAndCount();

		return {  characters, count  };
	}
}

export { CharactersRepository };