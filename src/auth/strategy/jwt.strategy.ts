
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { plainToClass, plainToInstance } from 'class-transformer';
import { UserDto } from 'src/entities/dto/user.dto';
import { jwtDto } from 'src/entities/dto/jwt.info.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_TOKEN as string,
    });
  }

  public validate(payload: jwtDto) {
      if (!payload || !payload.username) {
        throw new UnauthorizedException('Invalid token payload');
      }
    
      return { id: payload.sub, email: payload.email, username: payload.username, };
  }
}