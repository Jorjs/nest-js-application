import { Injectable } from "@nestjs/common";
import { UserEntity } from "../entities/user.entity";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
import { ObjectId } from 'mongodb';

@Injectable()
export class UserRepository {

    constructor(
        @InjectRepository(UserEntity) 
        private repository: Repository<UserEntity>) {}


    public async findOneById(_id: ObjectId): Promise<UserEntity | null> {
        return await this.repository.findOneBy({_id});

    }

    public async getUsers(): Promise<UserEntity[] | null> {
            return await this.repository.find();
    }

}