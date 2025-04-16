import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserAndOperationTables1744762162073 implements MigrationInterface {
    name = 'CreateUserAndOperationTables1744762162073'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "operations" ("id" SERIAL NOT NULL, "operation" character varying NOT NULL, "operandA" double precision NOT NULL, "operandB" double precision NOT NULL, "result" double precision NOT NULL, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_7b62d84d6f9912b975987165856" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "operations" ADD CONSTRAINT "FK_2120212425c06cf59434e1089af" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "operations" DROP CONSTRAINT "FK_2120212425c06cf59434e1089af"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "operations"`);
    }

}
