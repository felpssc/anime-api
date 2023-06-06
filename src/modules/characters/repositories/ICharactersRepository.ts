import { ICreateCharacterDTO } from "../dtos/ICreateCharacterDTO";
import { Character } from "../infra/typeorm/entities/Character";

interface IListCharactersFilters {
  offset: number;
  limit: number;
  clan: string;
  gender: string;
  name: string;
}

interface IListCharactersResponse {
  characters: Character[];
  count: number;
}

interface ICharactersRepository {
  create(data: ICreateCharacterDTO): Promise<Character>;
  list(filters: IListCharactersFilters): Promise<IListCharactersResponse>;
}

export { ICharactersRepository, IListCharactersFilters, IListCharactersResponse };