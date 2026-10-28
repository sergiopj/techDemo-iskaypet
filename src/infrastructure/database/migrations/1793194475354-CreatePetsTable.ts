import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePetsTable1793194475354 implements MigrationInterface {
  name = "CreatePetsTable1793194475354";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "pets" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "species" character varying(20) NOT NULL, "gender" character varying(20) NOT NULL, "birthdate" date NOT NULL, CONSTRAINT "PK_d01e9e7b4ada753c826720bee8b" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "pets"`);
  }
}
