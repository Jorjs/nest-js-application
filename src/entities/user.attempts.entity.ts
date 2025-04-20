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

    @Column({default: false})
    userClicked: boolean

    @Column({default: false})
    sent: boolean;

}