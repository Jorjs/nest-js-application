import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";

@Exclude()
export class AttemptDto {
    @Expose({name: "_id"})
    @ApiProperty()
    id: string;

    @Expose()
    @ApiProperty()
    email: string;

    @Expose()
    @ApiProperty()
    emailContent: string;

    @Expose()
    @ApiProperty()
    userClicked: boolean;

    @Expose()
    @ApiProperty()
    sent: boolean;
} 