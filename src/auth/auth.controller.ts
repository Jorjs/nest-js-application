import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LoginDto } from 'src/entities/dto/login.request.dto';
import { RegisterDto } from 'src/entities/dto/register.dto';
import { AuthService } from 'src/auth/auth.service';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Type } from 'class-transformer';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Returns a property of substation',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Property of specified substation'
  })
  @Post('/login')
  public async login(@Body() loginInfo: LoginDto): Promise<any> {
    return await this.authService.login(loginInfo);
  }

  @ApiOperation({
    summary: 'Returns a property of substation',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Register a user'
  })
  @HttpCode(HttpStatus.OK)
  @ApiBody({type: RegisterDto})
  @Post('/register')
  public async register(@Body() registerInfo: RegisterDto): Promise<any> {
    return await this.authService.register(registerInfo);
  }

}
