import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createClanTable1683229166819 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		return await queryRunner.createTable(new Table({
			name: "clans",
			columns: [
				{
					name: "id",
					type: "uuid",
					isPrimary: true,
				},
				{
					name: "name",
					type: "varchar",
				},
				{
					name: "icon",
					type: "varchar",
					isNullable: true,
				},
				{
					name: "link",
					type: "varchar",
					isNullable: true,
				},
				{
					name: "created_at",
					type: "timestamp",
					default: "now()",
				},
				{
					name: "updated_at",
					type: "timestamp",
					default: "now()",
				}
			]
		}), true);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		return await queryRunner.dropTable("clans");
	}

}
