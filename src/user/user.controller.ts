
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from 'src/entities/dto/user.dto';
import { UserService } from './user.service';
import { Controller, Get, HttpCode, HttpStatus, Param, UseGuards } from '@nestjs/common';
import { ObjectId } from 'mongodb';

@Controller('api/users')
@ApiTags('Users')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('access-token')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @ApiOperation({
    summary: 'get users',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [UserDto]
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  public async getUsers(): Promise<UserDto[]> {
    return await this.userService.getUsers();
  }

  @ApiOperation({
    summary: 'Returns a property of substation',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserDto
  })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  public async getUserById(@Param('id') id: string): Promise<UserDto> {
    const objectId = new ObjectId(id);
    
    return await this.userService.getUserById(objectId);
  }
}