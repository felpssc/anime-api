import { container } from "tsyringe";

import { UsersRepository } from "../../modules/accounts/infra/typeorm/repositories/UsersRepository";
import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository";
import { CharactersRepository } from "../../modules/characters/infra/typeorm/repositories/CharactersRepository";
import { ICharactersRepository } from "../../modules/characters/repositories/ICharactersRepository";
import { ClansRepository } from "../../modules/clans/infra/typeorm/repositories/ClansRepository";
import { IClansRepository } from "../../modules/clans/repositories/IClansRepository";

container.registerSingleton<IUsersRepository>(
	"UsersRepository",
	UsersRepository
);

container.registerSingleton<IClansRepository>(
	"ClansRepository",
	ClansRepository
);

container.registerSingleton<ICharactersRepository>(
	"CharactersRepository",
	CharactersRepository
);


export { container };