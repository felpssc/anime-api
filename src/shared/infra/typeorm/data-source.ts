import "dotenv/config";
import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { User } from "../../../modules/accounts/infra/typeorm/entities/User";
import { Character } from "../../../modules/characters/infra/typeorm/entities/Character";
import { Clan } from "../../../modules/clans/infra/typeorm/entities/Clan";
import { CharacterImage } from "../../../modules/characters/infra/typeorm/entities/CharacterImage";

const entities = [User, Clan, Character, CharacterImage];

const connectionOptionsDev = {
	type: "postgres",
	host: "localhost",
	port: 54320,
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	synchronize: true,
	logging: false,
	entities,
	migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
	subscribers: [],
} as DataSourceOptions;

const connectionOptionsPrd = {
	type: "postgres",
	url: process.env.DATABASE_URL,
	synchronize: true,
	logging: false,
	entities,
	migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
	subscribers: [],
	ssl: true
} as DataSourceOptions;

const connection = process.env.NODE_ENV === "dev" ? connectionOptionsDev : connectionOptionsPrd;

export const AppDataSource = new DataSource(connection);