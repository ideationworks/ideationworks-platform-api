import { PaginationResponse } from "../_lib/common/pagination/PaginationResponse";
import { Idea } from "./Idea";
import { IdeaResponse } from "./IdeaResponse";
import { ApiProperty } from "@nestjs/swagger";
import { PaginationQuery } from "../_lib/common/pagination/PaginationQuery";

export class IdeaPaginationResponse extends PaginationResponse<Idea, IdeaResponse> {

    @ApiProperty({ type: [IdeaResponse] })
    records: IdeaResponse[]

    constructor(items: [Idea[], number], page: PaginationQuery<Idea>) {
        
        super(IdeaResponse, items, page)

    }

}