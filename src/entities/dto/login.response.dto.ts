import { Type } from "class-transformer";
import { UserDto } from "./user.dto";
import { ApiProperty } from "@nestjs/swagger";

export class LoginResponseDto {

    @Type(() => UserDto)
    @ApiProperty({type: UserDto })
    user: UserDto;

    @ApiProperty()
    token: string
} 