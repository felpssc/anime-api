import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createUserTable1678033679248 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "users",
				columns: [
					{
						name: "id",
						type: "uuid",
						isPrimary: true
					},
					{
						name: "name",
						type: "varchar"
					},
					{
						name: "email",
						type: "varchar"
					},
					{
						name: "password",
						type: "varchar"
					},
					{
						name: "is_admin",
						type: "boolean"
					},
					{
						name: "created_at",
						type: "timestamp",
						default: "now()"
					},
					{
						name: "updated_at",
						type: "timestamp",
						default: "now()"
					}
				]
			}),
			true
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("users", true);
	}

}
