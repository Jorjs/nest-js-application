import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from "typeorm";
import { UsersAttemptsEntity } from "src/entities/user.attempts.entity";
import { ObjectId } from "mongodb";

@Injectable()
export class PhishingRepository {

    constructor(
        @InjectRepository(UsersAttemptsEntity) 
        private repository: Repository<UsersAttemptsEntity>) {}


    public async getAll(): Promise<UsersAttemptsEntity[]> {
        return await this.repository.find();
    }

    public async updateStatus(_id: ObjectId): Promise<UpdateResult> {
        return await this.repository.update(_id, {userClicked: true});
    }

}