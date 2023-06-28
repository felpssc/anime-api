import { Repository } from "typeorm";
import { AppDataSource } from "../../../../../shared/infra/typeorm/data-source";
import { ICreateClanDTO } from "../../../dtos/ICreateClanDTO";
import { IClansRepository, IFindClansResponse, IListClansFilters } from "../../../repositories/IClansRepository";
import { Clan } from "../entities/Clan";

class ClansRepository implements IClansRepository {
	private repository: Repository<Clan>;

	constructor() {
		this.repository = AppDataSource.getRepository(Clan);
	}
  
	async create(data: ICreateClanDTO): Promise<void> {
		const clan = this.repository.create(data);

		await this.repository.save(clan);
	}

	async findById(id: string): Promise<Clan> {
		const clan = await this.repository.findOne({
			where: { id }
		});

		return clan;
	}
	
	async list({ offset, limit, name }: IListClansFilters): Promise<IFindClansResponse> {
		const query = this.repository.createQueryBuilder("clans");

		if (name) {
			query.where("clans.name like :name",  { name: `%${name}%` });
		}

		if (offset) {
			query.skip(offset);
		}
		if (limit) {
			query.take(limit);
		}

		const clans = await query.getMany();
		const count = await query.getCount();

		return { clans, count };
	}
  
	async findByName(name: string): Promise<IFindClansResponse> {
		const clans = await this.repository.createQueryBuilder("clans")
			.where("clans.name like :name",  { name: `%${name}%` })
			.getMany();

		const count = await this.repository.createQueryBuilder("clans")
			.where("clans.name like :name",  { name: `%${name}%` })
			.getCount();

		return {
			clans,
			count
		};
	}

}

export { ClansRepository };