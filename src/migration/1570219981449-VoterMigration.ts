import {MigrationInterface, QueryRunner} from "typeorm";
import {Table, TableIndex, TableColumn, TableForeignKey } from "typeorm";

export class VoterMigration1570219981449 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {

        await queryRunner.createTable(new Table({
            name: "voter",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true
                },
                {
                    name: "firstName",
                    type: "varchar",
                },
                {
                    name: "dni",
                    type: "int",
                },
                {
                    name: "age",
                    type: "int",
                }
            ]
        }), true)

    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable("voter");
    }

}
