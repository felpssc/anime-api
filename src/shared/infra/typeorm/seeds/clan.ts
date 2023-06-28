import { defaultClanId } from "../../../../config/clan";
import { AppDataSource } from "../data-source";

async function create() {
	await AppDataSource.initialize();

	await AppDataSource.query(`INSERT INTO clans (id, name, icon, link) VALUES ('${defaultClanId}', 'Null', 'Null', 'Null')`);
}

create().then(() => console.log("Default clan created."));