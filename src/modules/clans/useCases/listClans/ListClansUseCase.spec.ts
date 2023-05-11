import { ICreateClanDTO } from "../../dtos/ICreateClanDTO";
import { IClansRepository } from "../../repositories/IClansRepository";
import { ClansRepositoryInMemory } from "../../repositories/inMemory/ClansRepositoryInMemory";
import { ListClansUseCase } from "./ListClansUseCase";

let clansRepository: IClansRepository;
let listClansUseCase: ListClansUseCase;

describe("FindClanByNameUseCase", () => {
	beforeEach(() => {
		clansRepository = new ClansRepositoryInMemory();
		listClansUseCase = new ListClansUseCase(clansRepository);
	});

	it("Should be able to find a clan by name", async () => {
		const clan: ICreateClanDTO = {
			name: "Test clan",
			icon: "test",
			link: "test",
		};

		await clansRepository.create(clan);

		const foundClan = await listClansUseCase.execute({ name: "Test clan" });

		expect(foundClan).toHaveProperty("clans");
		expect(foundClan.clans[0]).toHaveProperty("name");
		expect(foundClan.count).toBe(1);
	});

	it("Should not be able to find a clan by name", async () => {
		const clan: ICreateClanDTO = {
			name: "Test clan",
			icon: "test",
			link: "test",
		};

		await clansRepository.create(clan);

		const foundClan = await listClansUseCase.execute({ name: "Test clan 2"  });

		expect(foundClan.count).toBe(0);
	});

	it("Should be able to find more than one clan by name", async () => {
		const clan: ICreateClanDTO = {
			name: "Test clan",
			icon: "test",
			link: "test",
		};

		await clansRepository.create(clan);

		const clan2: ICreateClanDTO = {
			name: "Test clan 2",
			icon: "test",
			link: "test",
		};

		await clansRepository.create(clan2);

		const clan3: ICreateClanDTO = {
			name: "Another Clan",
			icon: "test",
			link: "test",
		};

		await clansRepository.create(clan3);

		const foundClan = await listClansUseCase.execute({  name: "Test clan"   });

		expect(foundClan.count).toBe(2);
  
	});
});