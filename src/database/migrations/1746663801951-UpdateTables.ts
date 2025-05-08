import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTables1746663801951 implements MigrationInterface {
    name = 'UpdateTables1746663801951'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_7ba30c759c60d00bf5d0ffc27a8"`);
        await queryRunner.query(`CREATE TYPE "public"."goal_status_enum" AS ENUM('active', 'completed', 'cancelled')`);
        await queryRunner.query(`CREATE TABLE "goal" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(255) NOT NULL, "amount" numeric(10,2) NOT NULL, "start_date" date NOT NULL, "end_date" date, "status" "public"."goal_status_enum" NOT NULL DEFAULT 'active', "user_id" uuid NOT NULL, "currency_id" uuid NOT NULL, CONSTRAINT "PK_88c8e2b461b711336c836b1e130" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "balance" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "amount" numeric(10,2) NOT NULL, "currency_id" uuid, CONSTRAINT "PK_079dddd31a81672e8143a649ca0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "wallet" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(255) NOT NULL, "balance" numeric(10,2) NOT NULL, "currency_id" uuid NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_bec464dd8d54c39c54fd32e2334" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "currency_code_id"`);
        await queryRunner.query(`ALTER TABLE "currency" DROP COLUMN "currency_code"`);
        await queryRunner.query(`ALTER TABLE "currency" DROP COLUMN "currency_name"`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "currency_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "wallet_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "currency" ADD "code" character varying(3) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "currency" ADD "name" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "category_limit" DROP CONSTRAINT "FK_68acb8338a3e4e18dd8fd5e20f9"`);
        await queryRunner.query(`ALTER TABLE "category_limit" ADD CONSTRAINT "UQ_68acb8338a3e4e18dd8fd5e20f9" UNIQUE ("category_id")`);
        await queryRunner.query(`ALTER TABLE "category_limit" ADD CONSTRAINT "UQ_68acb8338a3e4e18dd8fd5e20f9" UNIQUE ("category_id")`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_595f8b5303f23e9c063fda56fae" FOREIGN KEY ("currency_id") REFERENCES "currency"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_08081d10759ec250c557cebd81a" FOREIGN KEY ("wallet_id") REFERENCES "wallet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "goal" ADD CONSTRAINT "FK_0833c5f34d131cf9a7af51f30cf" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "goal" ADD CONSTRAINT "FK_e6b4f4ced0664e2caf53d2720c2" FOREIGN KEY ("currency_id") REFERENCES "currency"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "balance" ADD CONSTRAINT "FK_aed9f0179f8907f39dfbb2b0dca" FOREIGN KEY ("currency_id") REFERENCES "currency"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category_limit" ADD CONSTRAINT "FK_68acb8338a3e4e18dd8fd5e20f9" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "wallet" ADD CONSTRAINT "FK_3a458d3da4096019c5cd630c22e" FOREIGN KEY ("currency_id") REFERENCES "currency"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "wallet" ADD CONSTRAINT "FK_72548a47ac4a996cd254b082522" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallet" DROP CONSTRAINT "FK_72548a47ac4a996cd254b082522"`);
        await queryRunner.query(`ALTER TABLE "wallet" DROP CONSTRAINT "FK_3a458d3da4096019c5cd630c22e"`);
        await queryRunner.query(`ALTER TABLE "category_limit" DROP CONSTRAINT "FK_68acb8338a3e4e18dd8fd5e20f9"`);
        await queryRunner.query(`ALTER TABLE "balance" DROP CONSTRAINT "FK_aed9f0179f8907f39dfbb2b0dca"`);
        await queryRunner.query(`ALTER TABLE "goal" DROP CONSTRAINT "FK_e6b4f4ced0664e2caf53d2720c2"`);
        await queryRunner.query(`ALTER TABLE "goal" DROP CONSTRAINT "FK_0833c5f34d131cf9a7af51f30cf"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_08081d10759ec250c557cebd81a"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_595f8b5303f23e9c063fda56fae"`);
        await queryRunner.query(`ALTER TABLE "category_limit" DROP CONSTRAINT "UQ_68acb8338a3e4e18dd8fd5e20f9"`);
        await queryRunner.query(`ALTER TABLE "category_limit" DROP CONSTRAINT "UQ_68acb8338a3e4e18dd8fd5e20f9"`);
        await queryRunner.query(`ALTER TABLE "category_limit" ADD CONSTRAINT "FK_68acb8338a3e4e18dd8fd5e20f9" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "currency" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "currency" DROP COLUMN "code"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "wallet_id"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "currency_id"`);
        await queryRunner.query(`ALTER TABLE "currency" ADD "currency_name" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "currency" ADD "currency_code" character varying(3) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "currency_code_id" uuid NOT NULL`);
        await queryRunner.query(`DROP TABLE "wallet"`);
        await queryRunner.query(`DROP TABLE "balance"`);
        await queryRunner.query(`DROP TABLE "goal"`);
        await queryRunner.query(`DROP TYPE "public"."goal_status_enum"`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_7ba30c759c60d00bf5d0ffc27a8" FOREIGN KEY ("currency_code_id") REFERENCES "currency"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
