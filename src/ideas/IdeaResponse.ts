import { IdeaCommentResponse } from './comments/IdeaCommentResponse';
import { BaseResponse } from '../_lib/common/BaseResponse';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IdeaStatus } from './IdeaStatus';
import { TagResponse } from '../tags/TagResponse';
import { CategoryResponse } from '../categories/CategoryResponse';
import { UserResponse } from '../users/Response/UserResponse';
import { IdeaVoteResponse } from './votes/IdeaVoteResponse';
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

    @ApiProperty()
    @Expose()
    @Type(() => UserResponse)
    owner: UserResponse;

    @ApiProperty()
    @Expose()
    categoryId: string;

    @ApiProperty()
    @Expose()
    @Type(() => CategoryResponse)
    category: CategoryResponse;

    @ApiProperty()
    @Expose()
    status: IdeaStatus;

    @ApiProperty({ type: TagResponse })
    @Expose()
    @Type(() => TagResponse)
    tags: TagResponse[];

    @ApiProperty()
    @Expose()
    votesUp: number;

    @ApiProperty()
    @Expose()
    votesDown: number;

    @ApiProperty()
    @Expose()
    @Type(() => IdeaVoteResponse)
    userVote: IdeaVoteResponse;

    @ApiProperty()
    @Expose()
    stampCreated: Date;

    @ApiProperty()
    @Expose()
    stampUpdated: Date;

    @ApiProperty({ type: () => IdeaCommentResponse })
    @Expose()
    @Type(() => IdeaCommentResponse)
    comments: IdeaCommentResponse[];

}