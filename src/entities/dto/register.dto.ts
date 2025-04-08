import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, Length, MaxLength, Min } from "class-validator";

export class RegisterDto {
    @IsNotEmpty()
    @MaxLength(50)
    @IsString()
    @ApiProperty()
    name: string;

    @IsNotEmpty()
    @MaxLength(50)
    @IsString()
    @ApiProperty()
    lastName: string;

    @IsEmail()
    @MaxLength(250)
    @ApiProperty()
    email: string;

    @IsString()
    @MaxLength(250)
    @Length(3, 50)
    @ApiProperty()
    username: string;

    @IsStrongPassword()
    @ApiProperty()
    @MaxLength(250)
    password: string;
} 