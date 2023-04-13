import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../infra/typeorm/entities/User";

interface FindByEmailOptions {
	includePassword?: boolean;
}

interface IUsersRepository {
  create(user: ICreateUserDTO): Promise<void>
  findByEmail(email: string, options?: FindByEmailOptions): Promise<User>
  findById(id: string): Promise<User>
}

export { IUsersRepository, FindByEmailOptions };