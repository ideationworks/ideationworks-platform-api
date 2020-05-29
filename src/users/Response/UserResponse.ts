import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class UserResponse {
    @ApiProperty()
    @Expose()
    id: String;

    @ApiProperty()
    @Expose()
    displayName: String;

    @ApiProperty()
    firstName: String;

    @ApiProperty()
    lastName: String;
}