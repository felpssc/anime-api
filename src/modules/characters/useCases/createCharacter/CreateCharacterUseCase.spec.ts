import { ICreateCharacterDTO } from "../../dtos/ICreateCharacterDTO";
import { ICharactersRepository } from "../../repositories/ICharactersRepository";
import { CharactersRepositoryInMemory } from "../../repositories/inMemory/CharactersRepositoryInMemory";
import { CreateCharacterUseCase } from "./CreateCharacterUseCase";

let charactersRepository: ICharactersRepository;
let createCharacterUseCase: CreateCharacterUseCase;

describe("CreateCharacterUseCase", () => {
	beforeEach(() => {
		charactersRepository = new CharactersRepositoryInMemory();
		createCharacterUseCase = new CreateCharacterUseCase(charactersRepository);
	});

	it("Should be able to create a new character", async () => {
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