import { BaseResponse } from "../_lib/common/BaseResponse";
import { Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class CategoryResponse extends BaseResponse {

    @Expose()
    @ApiProperty()
    id: string;

    @Expose()
    @ApiProperty()
    name: string;

    @Expose()
    @ApiProperty()
    description: string;
    
}