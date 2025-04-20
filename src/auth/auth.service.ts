import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from 'src/entities/dto/login.request.dto';
import { AuthRepository } from 'src/auth/auth.repository';
import { UserEntity } from 'src/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from 'src/entities/dto/register.dto';
import { plainToInstance } from 'class-transformer';
import { LoginResponseDto } from 'src/entities/dto/login.response.dto';
import { UserDto } from 'src/entities/dto/user.dto';
import * as bcrypt from 'bcrypt';
import { jwtDto } from 'src/entities/dto/jwt.info.dto';


@Injectable()
export class AuthService {
  constructor ( 
    private authRepository: AuthRepository, 
    private jwtService: JwtService
  ) {}

  public async login(loginInfo: LoginDto) {

    const user: UserEntity | null = await this.authRepository.findOneByUsername(loginInfo.username);

    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    if(await bcrypt.compare(loginInfo.password, user.password)) { 
      const payload: jwtDto =  {
        sub: user._id.toString(), 
        email: user.email,
        username: user.username,
      }
      const accessToken = this.jwtService.sign(payload);
      const userDto = plainToInstance(UserDto, user);

      return {
        user: userDto,
        token: accessToken
      } as LoginResponseDto;
    }

    else {
      throw new UnauthorizedException('Invalid username or password');
    }
  }

  public async register(registerInfo: RegisterDto) {
    const user = plainToInstance(UserEntity, registerInfo);
    user.password = await bcrypt.hash(user.password, 12); 

    const takenEmailOrUsername = await this.authRepository.findOneByUsernameAndEmail(user.username, user.email);

    if(takenEmailOrUsername) {
      throw new BadRequestException("Username or email are taken")
    }
    const result = await this.authRepository.save(user);

    if(result) {
      const payload =  {
        sub: user._id.toString(), 
        email: result.email,
        username: result.username,
      }
      const userDto = plainToInstance(UserDto, result);
      const accessToken = this.jwtService.sign(payload);

      return {
        user: userDto,
        token: accessToken
      } as LoginResponseDto;
    }
  }
}
