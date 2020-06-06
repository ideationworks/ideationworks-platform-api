import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, IsIn } from "class-validator";
import { IdeaStatus } from "./IdeaStatus";
import { getValuesFromEnum } from "../_lib/GetVluesFromEnum";

export class CreateIdea {

    @ApiProperty()
    @IsString()
    @Length(0, 256)
    title: string

    @ApiProperty()
    @IsString()
    @Length(0, 4000)
    description: string

    @ApiProperty()
    @IsString()
    categoryId: string

    @ApiProperty()
    @IsIn(getValuesFromEnum(IdeaStatus, { remove: ['DELETED'] }))
    status: IdeaStatus

}