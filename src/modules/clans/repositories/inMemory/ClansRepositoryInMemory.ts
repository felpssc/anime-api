import { Clan } from "../../infra/typeorm/entities/Clan";
import { IClansRepository, IFindClansResponse, IListClansFilters } from "../IClansRepository";

class ClansRepositoryInMemory implements IClansRepository {
	clans: Clan[] = [];
  
	async create(data: Clan): Promise<void> {
		const clan = new Clan();
    
		Object.assign(clan, data);
    
		this.clans.push(clan);
	}
  
	async findById(id: string): Promise<Clan> {
		const clan = this.clans.find(clan => clan.id === id);

		return clan;
	}

	async list({ offset, limit, name }: IListClansFilters): Promise<IFindClansResponse> {
		
		const clans = this.clans.filter(clan => clan.name.toLowerCase().includes(name.toLowerCase()));

		const count = clans.length;

		if (offset) {
			clans.splice(0, offset);
		}
		
		if (limit) {
			clans.splice(limit);
		}

		return { clans, count };
	}

	async findByName(name: string): Promise<IFindClansResponse> {
		const clans = this.clans.filter(clan => clan.name.toLowerCase().includes(name.toLowerCase()));

		return {
			clans,
			count: clans.length
		};
	}
}

export  { ClansRepositoryInMemory };