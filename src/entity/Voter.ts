import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Voter {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    dni: number;

    @Column()
    age: number;

}
