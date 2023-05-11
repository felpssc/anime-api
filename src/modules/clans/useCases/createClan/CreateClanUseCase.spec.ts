import { ICreateClanDTO } from "../../dtos/ICreateClanDTO";
import { IClansRepository } from "../../repositories/IClansRepository";
import { ClansRepositoryInMemory } from "../../repositories/inMemory/ClansRepositoryInMemory";
import { CreateClanUseCase } from "./CreateClanUseCase";

let clansRepository: IClansRepository;
let createClanUseCase: CreateClanUseCase;

describe("CreateClanUseCase", () => {
	beforeEach(() => {
		clansRepository = new ClansRepositoryInMemory();
		createClanUseCase = new CreateClanUseCase(clansRepository);
	});

	it("Should be able to create a clan", async () => {
		const clan: ICreateClanDTO = {
			name: "Test clan",
			icon: "test",
			link: "test",
		};

		await createClanUseCase.execute(clan);

		const wasClanCreated = await clansRepository.findByName(clan.name);

		expect(wasClanCreated.clans[0]).toHaveProperty("id");
	});
});