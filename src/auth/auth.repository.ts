import { Injectable } from "@nestjs/common";
import { UserEntity } from "../entities/user.entity";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";

@Injectable()
export class AuthRepository {

    constructor(
        @InjectRepository(UserEntity) 
        private repository: Repository<UserEntity>) {}


    public async findOneByUsername(username: string): Promise<UserEntity | null> {
        return await this.repository.findOneBy({username});
    }

    public async findOneByUsernameAndEmail(username: string, email: string): Promise<UserEntity | null> {
        
        const where = {}
        where['username'] = username;
        where['email'] = email;

        return await this.repository.findOneBy(where);
    }

    public async save(user: UserEntity): Promise<UserEntity | null> {
            return await this.repository.save(user);
    }

}