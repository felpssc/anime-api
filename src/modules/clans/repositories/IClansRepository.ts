import { ICreateClanDTO } from "../dtos/ICreateClanDTO";
import { Clan } from "../infra/typeorm/entities/Clan";

interface IFindClansResponse {
  clans: Clan | Clan[],
  count: number
}

interface IListClansFilters {
  name?: string,
  offset?: number,
  limit?: number
}

interface IClansRepository {
  create(clan: ICreateClanDTO): Promise<void>
  findById(id: string): Promise<Clan>
  list(filters: IListClansFilters): Promise<IFindClansResponse>
  findByName(name: string): Promise<IFindClansResponse>
}

export { IClansRepository, IFindClansResponse, IListClansFilters };