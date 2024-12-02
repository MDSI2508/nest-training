import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUniversityIdToGroup1733148081371 implements MigrationInterface {
  name = 'AddUniversityIdToGroup1733148081371';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "group" ("id" SERIAL NOT NULL, "groupName" character varying NOT NULL, "universityId" integer, CONSTRAINT "PK_256aa0fda9b1de1a73ee0b7106b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "university" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_d14e5687dbd51fd7a915c22ac13" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "student" ADD "groupId" integer`);
    await queryRunner.query(`ALTER TABLE "student" ADD "universityId" integer`);
    await queryRunner.query(
      `ALTER TABLE "group" ADD CONSTRAINT "FK_e156c2d8b2b01cd0715fbfabe90" FOREIGN KEY ("universityId") REFERENCES "university"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "student" ADD CONSTRAINT "FK_ce9660fc114efef4062bba4c119" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "student" ADD CONSTRAINT "FK_d51c79e7ce60bfee43622bdd705" FOREIGN KEY ("universityId") REFERENCES "university"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "student" DROP CONSTRAINT "FK_d51c79e7ce60bfee43622bdd705"`,
    );
    await queryRunner.query(
      `ALTER TABLE "student" DROP CONSTRAINT "FK_ce9660fc114efef4062bba4c119"`,
    );
    await queryRunner.query(
      `ALTER TABLE "group" DROP CONSTRAINT "FK_e156c2d8b2b01cd0715fbfabe90"`,
    );
    await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "universityId"`);
    await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "groupId"`);
    await queryRunner.query(`DROP TABLE "university"`);
    await queryRunner.query(`DROP TABLE "group"`);
  }
}
