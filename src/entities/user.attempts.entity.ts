import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity('UsersAttempts')
export class UsersAttemptsEntity {

    @ObjectIdColumn()
    _id: ObjectId

    @Column()
    email: string

    @Column()
    emailContent: string

    @Column()
    userClicked: boolean

}