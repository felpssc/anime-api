import { Repository } from "typeorm";
import { AppDataSource } from "../../../../../shared/infra/typeorm/data-source";
import { ICreateCharacterDTO } from "../../../dtos/ICreateCharacterDTO";
import { ICharactersRepository, IListCharactersFilters, IListCharactersResponse } from "../../../repositories/ICharactersRepository";
import { Character } from "../entities/Character";
import { defaultClanId } from "../../../../../config/clan";
import { CharacterImage } from "../entities/CharacterImage";

class CharactersRepository implements ICharactersRepository {
	
	private repository: Repository<Character>;

	constructor() {
		this.repository = AppDataSource.getRepository(Character);
	}
  
	async create({
		name,
		page,
		about,
		clan_id,
		images,
		info
	}: ICreateCharacterDTO): Promise<Character> {

		if (!clan_id) {
			clan_id = defaultClanId;
		}

		const queryRunner = AppDataSource.createQueryRunner();

		try {
			await queryRunner.startTransaction();
	
			const character = new Character();
	
			Object.assign(character, {
				name, page, about, info, clan_id
			});
	
			const characterImages: CharacterImage[] = images.map(url => {
				const img = new CharacterImage();
	
				Object.assign(img, {
					character_id: character.id,
					link: url
				});
	
				return img;
			});
	
			await queryRunner.manager.save(character);

			await queryRunner.manager.save(characterImages);

			await queryRunner.commitTransaction();
	
			return character;
		} catch (error) {	
			await queryRunner.rollbackTransaction();
		} finally {
			await queryRunner.release();
		}
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
		query.leftJoinAndSelect("characters.images", "character_image");

		const [ characters, count ] = await query.getManyAndCount();

		return {  characters, count  };
	}
}

export { CharactersRepository };