import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BaseResponse } from '../../_lib/common/BaseResponse';

export class UserResponse extends BaseResponse {

    @ApiProperty()
    @Expose()
    id: string;

    @ApiProperty()
    @Expose()
    displayName: string;

    @ApiProperty()
    @Expose()
    firstName: string;

    @ApiProperty()
    @Expose()
    lastName: string;

    @ApiProperty()
    @Expose()
    email: string;

}