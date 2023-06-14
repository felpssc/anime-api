import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class createCharacterImageTable1686678669131 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: "character_image",
			columns: [
				{
					name: "id",
					type: "uuid",
					isPrimary: true
				},
				{
					name: "character_id",
					type: "uuid",
					isNullable: true
				},
				{
					name: "link",
					type: "varchar",
					isNullable: true
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
			"character_image", 
			new TableForeignKey({
				name: "FK_character_image",
				columnNames: ["character_id"],
				referencedColumnNames: ["id"],
				referencedTableName: "characters",
				onDelete: "SET NULL",
				onUpdate: "CASCADE"
			}));
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey("character_image", "FK_character_image");
		await queryRunner.dropTable("character_image");
	}

}
