import { PaginationResponse } from "../_lib/common/pagination/PaginationResponse";
import { Category } from "./Category";
import { CategoryResponse } from "./CategoryResponse";
import { ApiProperty } from "@nestjs/swagger";
import { PaginationQuery } from "../_lib/common/pagination/PaginationQuery";

export class CategoryPaginationResponse extends PaginationResponse<Category, CategoryResponse> {

    @ApiProperty({ type: CategoryResponse })
    records: CategoryResponse[]

    constructor(items: [Category[], number], page: PaginationQuery<Category>) {

        super(CategoryResponse, items, page)

    }

}