import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";

@Exclude()
export class UserDto {
    @Expose()
    @ApiProperty()
    @Expose({name: "_id"})
    id: string;

    @Expose()
    @ApiProperty()
    username: string;

    @Expose()
    @ApiProperty()
    name: string;

    @Expose()
    @ApiProperty()
    lastName: string;

    @Expose()
    @ApiProperty()
    email: string;
} 