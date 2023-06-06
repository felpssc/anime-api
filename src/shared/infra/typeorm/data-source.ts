import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../../../modules/accounts/infra/typeorm/entities/User";
import { Character } from "../../../modules/characters/infra/typeorm/entities/Character";
import { Clan } from "../../../modules/clans/infra/typeorm/entities/Clan";

export const AppDataSource = new DataSource({
	type: "postgres",
	host: "localhost",
	port: 54320,
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	synchronize: true,
	logging: false,
	entities: [User, Clan, Character],
	migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
	subscribers: [],
});