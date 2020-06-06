import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, IsIn } from "class-validator";
import { IdeaStatus } from "./IdeaStatus";
import { Optional } from "@nestjs/common";
import { getValuesFromEnum } from "../_lib/GetVluesFromEnum";

export class UpdateIdea {

    @ApiProperty()
    @Optional()
    @IsString()
    @Length(0, 256)
    title: string

    @ApiProperty()
    @Optional()
    @IsString()
    @Length(0, 4000)
    description: string

    @ApiProperty()
    @Optional()
    @IsString()
    categoryId: string

    @ApiProperty()
    @Optional()
    @IsIn(getValuesFromEnum(IdeaStatus, { remove: ['DELETED'] }))
    status: IdeaStatus

}