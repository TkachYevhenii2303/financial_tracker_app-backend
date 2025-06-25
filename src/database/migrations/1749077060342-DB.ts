import { MigrationInterface, QueryRunner } from "typeorm";

export class DB1749077060342 implements MigrationInterface {
    name = 'DB1749077060342'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "refresh_token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "token" character varying(255) NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "REL_6bbe63d2fe75e7f0ba1710351d" UNIQUE ("user_id"), CONSTRAINT "PK_b575dd3c21fb0831013c909e7fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "currency_rate" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "rate" numeric(10,2) NOT NULL, "currency_from_id" uuid, "currency_to_id" uuid, CONSTRAINT "PK_a92517ae58f0f116bc0f792f878" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."category_limit_period_enum" AS ENUM('day', 'week', 'month', 'year')`);
        await queryRunner.query(`CREATE TABLE "category_limit" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "category_id" uuid NOT NULL, "limit" numeric(10,2) NOT NULL, "amount" numeric(10,2) NOT NULL, "period" "public"."category_limit_period_enum" NOT NULL DEFAULT 'week', "currency_id" uuid NOT NULL, CONSTRAINT "REL_68acb8338a3e4e18dd8fd5e20f" UNIQUE ("category_id"), CONSTRAINT "PK_6d4a96935c700d9ba65da02d9e4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(255) NOT NULL, "description" character varying(255) NOT NULL, "type" character varying(255) NOT NULL, "icon" uuid NOT NULL, "color" character varying(255) NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transaction" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "amount" numeric(10,2) NOT NULL, "description" character varying(255) NOT NULL, "category_id" uuid, "currency_id" uuid NOT NULL, "type" character varying(255) NOT NULL, "wallet_id" uuid NOT NULL, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "balance" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "amount" numeric(10,2) NOT NULL, "user_id" uuid NOT NULL, "currency_id" uuid, CONSTRAINT "REL_abf63b0d5bfa0266a50e507395" UNIQUE ("user_id"), CONSTRAINT "PK_079dddd31a81672e8143a649ca0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "currency" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "code" character varying(3) NOT NULL, "name" character varying(255) NOT NULL, CONSTRAINT "PK_3cda65c731a6264f0e444cc9b91" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."goal_status_enum" AS ENUM('active', 'completed', 'cancelled')`);
        await queryRunner.query(`CREATE TABLE "goal" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(255) NOT NULL, "amount" numeric(10,2) NOT NULL, "start_date" date NOT NULL, "end_date" date, "status" "public"."goal_status_enum" NOT NULL DEFAULT 'active', "user_id" uuid NOT NULL, "currency_id" uuid NOT NULL, CONSTRAINT "PK_88c8e2b461b711336c836b1e130" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "username" character varying(255), "password_hash" character varying(255), "budget" numeric(10,2) NOT NULL DEFAULT '0', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "wallet" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(255) NOT NULL, "balance" numeric(10,2) NOT NULL, "currency_id" uuid NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_bec464dd8d54c39c54fd32e2334" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "refresh_token" ADD CONSTRAINT "FK_6bbe63d2fe75e7f0ba1710351d4" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "currency_rate" ADD CONSTRAINT "FK_ed03e4b6b9ac26fb1eb5e7f8a1a" FOREIGN KEY ("currency_from_id") REFERENCES "currency"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "currency_rate" ADD CONSTRAINT "FK_8d7fe0f5237cd67199bf887ebbf" FOREIGN KEY ("currency_to_id") REFERENCES "currency"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category_limit" ADD CONSTRAINT "FK_68acb8338a3e4e18dd8fd5e20f9" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category_limit" ADD CONSTRAINT "FK_84b5c9346cea62bd922f4b017aa" FOREIGN KEY ("currency_id") REFERENCES "currency"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_595f8b5303f23e9c063fda56fae" FOREIGN KEY ("currency_id") REFERENCES "currency"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_abbe63b71ee4193f61c322ab497" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_08081d10759ec250c557cebd81a" FOREIGN KEY ("wallet_id") REFERENCES "wallet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "balance" ADD CONSTRAINT "FK_aed9f0179f8907f39dfbb2b0dca" FOREIGN KEY ("currency_id") REFERENCES "currency"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "balance" ADD CONSTRAINT "FK_abf63b0d5bfa0266a50e5073954" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "goal" ADD CONSTRAINT "FK_0833c5f34d131cf9a7af51f30cf" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "goal" ADD CONSTRAINT "FK_e6b4f4ced0664e2caf53d2720c2" FOREIGN KEY ("currency_id") REFERENCES "currency"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "wallet" ADD CONSTRAINT "FK_3a458d3da4096019c5cd630c22e" FOREIGN KEY ("currency_id") REFERENCES "currency"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "wallet" ADD CONSTRAINT "FK_72548a47ac4a996cd254b082522" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallet" DROP CONSTRAINT "FK_72548a47ac4a996cd254b082522"`);
        await queryRunner.query(`ALTER TABLE "wallet" DROP CONSTRAINT "FK_3a458d3da4096019c5cd630c22e"`);
        await queryRunner.query(`ALTER TABLE "goal" DROP CONSTRAINT "FK_e6b4f4ced0664e2caf53d2720c2"`);
        await queryRunner.query(`ALTER TABLE "goal" DROP CONSTRAINT "FK_0833c5f34d131cf9a7af51f30cf"`);
        await queryRunner.query(`ALTER TABLE "balance" DROP CONSTRAINT "FK_abf63b0d5bfa0266a50e5073954"`);
        await queryRunner.query(`ALTER TABLE "balance" DROP CONSTRAINT "FK_aed9f0179f8907f39dfbb2b0dca"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_08081d10759ec250c557cebd81a"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_abbe63b71ee4193f61c322ab497"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_595f8b5303f23e9c063fda56fae"`);
        await queryRunner.query(`ALTER TABLE "category_limit" DROP CONSTRAINT "FK_84b5c9346cea62bd922f4b017aa"`);
        await queryRunner.query(`ALTER TABLE "category_limit" DROP CONSTRAINT "FK_68acb8338a3e4e18dd8fd5e20f9"`);
        await queryRunner.query(`ALTER TABLE "currency_rate" DROP CONSTRAINT "FK_8d7fe0f5237cd67199bf887ebbf"`);
        await queryRunner.query(`ALTER TABLE "currency_rate" DROP CONSTRAINT "FK_ed03e4b6b9ac26fb1eb5e7f8a1a"`);
        await queryRunner.query(`ALTER TABLE "refresh_token" DROP CONSTRAINT "FK_6bbe63d2fe75e7f0ba1710351d4"`);
        await queryRunner.query(`DROP TABLE "wallet"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "goal"`);
        await queryRunner.query(`DROP TYPE "public"."goal_status_enum"`);
        await queryRunner.query(`DROP TABLE "currency"`);
        await queryRunner.query(`DROP TABLE "balance"`);
        await queryRunner.query(`DROP TABLE "transaction"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "category_limit"`);
        await queryRunner.query(`DROP TYPE "public"."category_limit_period_enum"`);
        await queryRunner.query(`DROP TABLE "currency_rate"`);
        await queryRunner.query(`DROP TABLE "refresh_token"`);
    }

}
