import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class createCharacterTable1683827216873 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: "characters",
			columns: [
				{
					name: "id",
					type: "uuid",
					isPrimary: true,
				},
				{
					name: "name",
					type: "varchar",
					isNullable: false,
				},
				{
					name: "page",
					type: "varchar",
					isNullable: true,
				},
				{
					name: "info",
					type: "json",
					isNullable: true,
					default: null,
				},
				{
					name: "about",
					type: "text ARRAY",
					isNullable: true,
				},
				{
					name: "clan_id",
					type: "uuid",
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

		await queryRunner.createForeignKey(
			"characters", 
			new TableForeignKey({
				name: "FKCharacterClan",
				columnNames: ["clan_id"],
				referencedColumnNames: ["id"],
				referencedTableName: "clans",
				onDelete: "SET NULL",
				onUpdate: "SET NULL"
			}));
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey("characters", "FKCharacterClan");
		await queryRunner.dropTable("characters");
	}
}
