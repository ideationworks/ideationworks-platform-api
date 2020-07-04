import { BaseResponse } from '../../_lib/common/BaseResponse';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { UserResponse } from '../../users/Response/UserResponse';
import { IdeaResponse } from '../IdeaResponse';

export class IdeaCommentResponse extends BaseResponse {

    @ApiProperty()
    @Expose()
    id: string;

    @ApiProperty()
    @Expose()
    comment: string;

    @ApiProperty()
    @Expose()
    userId: string;

    @ApiProperty()
    @Expose()
    @Type(() => UserResponse)
    user: UserResponse;

    @ApiProperty()
    @Expose()
    ideaId: string;

    @ApiProperty({ type: () => IdeaResponse })
    @Expose()
    @Type(() => IdeaResponse)
    idea: IdeaResponse;

    @ApiProperty()
    @Expose()
    stampCreated: Date;

    @ApiProperty()
    @Expose()
    stampUpdated: Date;

}
