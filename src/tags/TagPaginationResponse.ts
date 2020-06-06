import { PaginationResponse } from "../_lib/common/pagination/PaginationResponse";
import { TagResponse } from "./TagResponse";
import { Tag } from "./Tag";
import { PaginationQuery } from "src/_lib/common/pagination/PaginationQuery";
import { ApiProperty } from "@nestjs/swagger";

export class TagPaginationResponse extends PaginationResponse<Tag, TagResponse> {

    /**
     * Added to override data decorator to provide useful information to swager,
     * If needed it can be safetly removed.
     */
    @ApiProperty({ type: [TagResponse] })
    records: TagResponse[]

    constructor(items: [Tag[], number], page: PaginationQuery<Tag>) {

        super(TagResponse, items, page)

    }

}