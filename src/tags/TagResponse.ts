import { ApiProperty } from '@nestjs/swagger';
import { Expose, Exclude, plainToClassFromExist, ClassTransformOptions, classToPlain } from "class-transformer";
import { TagStatus } from './TagStatus';
import { BaseResponse } from '../_lib/common/BaseResponse';

export class TagResponse extends BaseResponse{

    @ApiProperty()
    @Expose()
    id: string;

    @ApiProperty()
    @Expose()
    name: Number;

    @ApiProperty()
    @Expose()
    description: String;

    @ApiProperty()
    @Expose()
    status: TagStatus

}