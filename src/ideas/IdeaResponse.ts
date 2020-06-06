import { BaseResponse } from "../_lib/common/BaseResponse";
import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IdeaStatus } from "./IdeaStatus";
import { TagResponse } from "../tags/TagResponse";

export class IdeaResponse extends BaseResponse {

    @ApiProperty()
    @Expose()
    id: string;

    @ApiProperty()
    @Expose()
    title: string;

    @ApiProperty()
    @Expose()
    description: string;

    @ApiProperty()
    @Expose()
    ownerId: string;

    //TODO: Add UserResponse 

    @ApiProperty()
    @Expose()
    categoryId: string;

    //TODO: Add Category depends on Category Management

    @ApiProperty()
    @Expose()
    status: IdeaStatus;

    @ApiProperty({ type: TagResponse })
    @Expose()
    @Type(() => TagResponse)
    tags: TagResponse[];


}