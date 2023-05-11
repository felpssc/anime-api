import { container } from "tsyringe";

import { UsersRepository } from "../../modules/accounts/infra/typeorm/repositories/UsersRepository";
import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository";
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

export { container };