import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, IsEnum } from "class-validator";
import { TagStatus } from "./TagStatus";

export class UpdateTag {

    @ApiProperty()
    @IsString()
    @IsOptional()
    name?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty()
    @IsOptional()
    @IsEnum(TagStatus)
    status?: TagStatus;

}  