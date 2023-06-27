import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class addAvatarAndBirthDateFieldsOnUsersTable1687893229649 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn("users", new TableColumn({
			name: "avatar",
			type: "varchar",
			isNullable: true
		}));

		await queryRunner.addColumn("users", new TableColumn({
			name: "birth_date",
			type: "varchar",
			isNullable: true
		}));
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn("users", "birth_date");
		await queryRunner.dropColumn("users", "avatar");
	}

}
