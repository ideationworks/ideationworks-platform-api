import { PaginationQuery } from '../../_lib/common/pagination/PaginationQuery';
import { IdeaCommentResponse } from './IdeaCommentResponse';
import { PaginationResponse } from '../../_lib/common/pagination/PaginationResponse';
import { IdeaComment } from './IdeaComment';
import { ApiProperty } from '@nestjs/swagger';

export class IdeaCommentPaginationResponse extends PaginationResponse<IdeaComment, IdeaCommentResponse>{

    @ApiProperty({ type: [IdeaCommentResponse] })
    records: IdeaCommentResponse[];

    constructor(items: [IdeaComment[], number], page: PaginationQuery<IdeaComment>) {

        super(IdeaCommentResponse, items, page);

    }
}