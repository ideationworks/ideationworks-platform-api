import { PaginationResponse } from "../_lib/common/pagination/PaginationResponse";
import { Idea } from "./Idea";
import { IdeaResponse } from "./IdeaResponse";
import { ApiProperty } from "@nestjs/swagger";
import { PaginationQuery } from "../_lib/common/pagination/PaginationQuery";
import { IdeaUserVote } from "./IdeaUserVote";

export class IdeaPaginationResponse extends PaginationResponse<IdeaUserVote, IdeaResponse> {

    @ApiProperty({ type: [IdeaResponse] })
    records: IdeaResponse[]

    constructor(items: [IdeaUserVote[], number], page: PaginationQuery<Idea>) {

        super(IdeaResponse, items, page)

    }

}