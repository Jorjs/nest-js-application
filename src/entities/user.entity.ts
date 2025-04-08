import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity('Users')
export class UserEntity {

    @ObjectIdColumn()
    _id: ObjectId

    @Column()
    name: string

    @Column()
    lastName: string

    @Column()
    email: string;

    @Column()
    username: string;

    @Column()
    password: string;
}

