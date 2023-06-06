import { IClansRepository } from "../../../clans/repositories/IClansRepository";
import { ClansRepositoryInMemory } from "../../../clans/repositories/inMemory/ClansRepositoryInMemory";
import { ICreateCharacterDTO } from "../../dtos/ICreateCharacterDTO";
import { ICharactersRepository } from "../../repositories/ICharactersRepository";
import { CharactersRepositoryInMemory } from "../../repositories/inMemory/CharactersRepositoryInMemory";
import { CreateCharacterUseCase } from "./CreateCharacterUseCase";

let charactersRepository: ICharactersRepository;
let clansRepository: IClansRepository;
let createCharacterUseCase: CreateCharacterUseCase;

describe("CreateCharacterUseCase", () => {
	beforeEach(() => {
		charactersRepository = new CharactersRepositoryInMemory();
		clansRepository = new ClansRepositoryInMemory();
		createCharacterUseCase = new CreateCharacterUseCase(charactersRepository, clansRepository);
	});

	it("Should be able to create a new character", async () => {
		const clan = {
			id: "1",
			name: "clan test",
			icon: "icon",
			link: "icone"
		};

		await clansRepository.create(clan);

		const character: ICreateCharacterDTO = {
			name: "Test",
			clan_id: "1",
			page: "page test",
			about: ["test", "test2"],
			info: JSON.stringify({
				Sexo: "Masculino",
				Idade: "20",
				Peso: "80",
			})
		};

		const wasCharacterCreated = await createCharacterUseCase.execute(character);

		expect(wasCharacterCreated).toHaveProperty("id");
	});
});