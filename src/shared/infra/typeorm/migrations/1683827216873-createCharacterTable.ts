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

		await queryRunner.createForeignKey("characters", new TableForeignKey({
			name: "characters_clan_id_fk",
			columnNames: ["clan_id"],
			referencedColumnNames: ["id"],
			referencedTableName: "clans",
			onDelete: "CASCADE"
		}));
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey("characters", "characters_clan_id_fk");
		await queryRunner.dropTable("characters");
	}
}
