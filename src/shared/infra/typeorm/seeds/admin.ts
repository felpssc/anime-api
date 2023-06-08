import { defaultAdmin } from "../../../../config/admin";

import { AppDataSource } from "../data-source";

import { hash } from "bcrypt";

async function create() {
	await AppDataSource.initialize();

	const {
		id,
		email,
		name,
		password
	} = defaultAdmin;

	const hashedPassword = await hash(password, 8);

	await AppDataSource.query(`INSERT INTO users (id, name, email, password, is_admin) VALUES ('${id}', '${name}', '${email}', '${hashedPassword}', true)`);
}

create().then(() => console.log("Default Admin created."));