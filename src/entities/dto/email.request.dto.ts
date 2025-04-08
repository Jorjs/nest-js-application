import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, MaxLength } from "class-validator";

export class EmailRequestDto {
    @IsEmail()
    @MaxLength(250)
    @ApiProperty()
    email: string;

} 