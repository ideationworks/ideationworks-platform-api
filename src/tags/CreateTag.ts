import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional } from "class-validator";

export class CreateTag {

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    description: string;

}  