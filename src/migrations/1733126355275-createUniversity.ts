import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUniversity1733126355275 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "university" (
                                      "id" SERIAL PRIMARY KEY,
                                      "name" VARCHAR NOT NULL
        )
    `);
    await queryRunner.query(`
        ALTER TABLE "student"
            ADD "universityId" INTEGER
    `);

    await queryRunner.query(`
        ALTER TABLE "student"
            ADD CONSTRAINT "FK_group_university"
                FOREIGN KEY ("universityId")
                    REFERENCES "university"("id")
                    ON DELETE CASCADE
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    ALTER TABLE "student" DROP CONSTRAINT "FK_student_university"
    `);

    await queryRunner.query(`
    ALTER TABLE "student" DROP COLUMN "universityId"
    `);

    await queryRunner.query(`
       ALTER TABLE "group" DROP CONSTRAINT "FK_group_university"
    `);

    await queryRunner.query(`
      ALTER TABLE "group" DROP COLUMN "universityId"
    `);

    await queryRunner.query(`
            DROP TABLE "university"
        `);
  }
}
