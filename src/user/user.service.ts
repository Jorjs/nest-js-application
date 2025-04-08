import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { plainToInstance } from 'class-transformer';
import { UserDto } from 'src/entities/dto/user.dto';
import { ObjectId } from 'mongodb';


@Injectable()
export class UserService {
  constructor ( 
    private userRepository: UserRepository, 
  ) {}

  public async getUsers(): Promise<UserDto[]> {
    const users = await this.userRepository.getUsers();

    if(!users) {
        throw new NotFoundException('User not found')
    }

    const usersDto = plainToInstance(UserDto, users);
    return usersDto;

  }

  public async getUserById(id: ObjectId): Promise<UserDto>  {
    
    const user = await this.userRepository.findOneById(id)
    if(!user) {
        throw new NotFoundException('User not found')
    }

    const userDto = plainToInstance(UserDto, user);
    return userDto;
  }
}
