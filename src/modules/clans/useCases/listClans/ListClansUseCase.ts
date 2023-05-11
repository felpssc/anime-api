import { inject, injectable } from "tsyringe";
import { IClansRepository, IFindClansResponse, IListClansFilters } from "../../repositories/IClansRepository";

@injectable()
class ListClansUseCase {
	constructor(
    @inject("ClansRepository")
    private clanRepository: IClansRepository
	) {}

	async execute(filters: IListClansFilters): Promise<IFindClansResponse> {
		const clans = await this.clanRepository.list(filters);

		return clans;
	}
}

export { ListClansUseCase };