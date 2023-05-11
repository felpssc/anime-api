import { inject, injectable } from "tsyringe";
import { ICreateClanDTO } from "../../dtos/ICreateClanDTO";
import { IClansRepository } from "../../repositories/IClansRepository";

@injectable()
class CreateClanUseCase {
	constructor(
    @inject("ClansRepository")
    private clansRepository: IClansRepository
	) {}

	async execute({ name, icon, link }: ICreateClanDTO) {
		await this.clansRepository.create({ name, icon, link });
	}
	
}

export { CreateClanUseCase};