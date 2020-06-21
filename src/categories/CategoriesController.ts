import {
    Body,
    Controller,
    Get,
    Param,
    ParseUUIDPipe,
    Post,
    Put,
    Delete,
    Query,
    HttpCode, UseGuards
} from '@nestjs/common';
import {ApiResponse, ApiTags} from '@nestjs/swagger';
import { CategoriesService }  from './CategoriesService';
import { Category } from './Category';
import { UpdateCategory } from './UpdateCategory';
import {PaginationQuery} from "../_lib/common/pagination/PaginationQuery";
import {CategoryPaginationResponse} from "./CategoryPaginationResponse";
import {FilterQuery} from "../_lib/common/queryFilter/FilterQuery";
import {CategoryResponse} from "./CategoryResponse";
import {PrincipalGuard} from "../_lib/PrincipalGuard";

@ApiTags('categories')
@Controller('/categories')
export class CategoriesController {

    public constructor(private categoriesService: CategoriesService) {

    }


    @Get()
    @HttpCode(200)
    @UseGuards(PrincipalGuard)
    @ApiResponse({ status: 200, type: CategoryPaginationResponse })
    async find(@Query() params: PaginationQuery<Category>) : Promise<CategoryPaginationResponse> {

        const query = params.getFindManyOptions({

            queryFields: ['name'],
            relations: ['categories'],
            sortBy: ['name'],
            softDelete: true,

        });

        const categories = await this.categoriesService.findAndCount(query);

        return new CategoryPaginationResponse(categories, params);

    }


    @Get(':id')
    @HttpCode(200)
    @UseGuards(PrincipalGuard)
    @ApiResponse({ status: 200, type: CategoryResponse })
    public async getById(@Param('id', ParseUUIDPipe) id: string, @Query() params: FilterQuery<Category>): Promise<CategoryResponse> {

        const query = params.getFindOneOptions({

            relations: ['categories'],
            softDelete: true

        });

        const category = await this.categoriesService.getById(id, query);

        return new CategoryResponse(category);

    }

    @Post()
    @HttpCode(201)
    @UseGuards(PrincipalGuard)
    @ApiResponse({ status: 200, type: CategoryResponse })
    public async create(@Body() category: Category): Promise<CategoryResponse> {

        const createdCategory =  await this.categoriesService.create(category);
        return  new CategoryResponse(createdCategory);

    }

    @Put(':id')
    @HttpCode(200)
    @UseGuards(PrincipalGuard)
    @ApiResponse({ status: 200, type: CategoryResponse })
    public async update(@Param('id') id: string, @Body() category: UpdateCategory) :Promise<CategoryResponse> {

        const updatedCategory =  await this.categoriesService.updateById(id, category);
        return new CategoryResponse(updatedCategory);


    }

    @Delete(':id')
    @HttpCode(204)
    @UseGuards(PrincipalGuard)
    @ApiResponse({ status: 204 })
    public deleteById(@Param('id', ParseUUIDPipe) id: string): Promise<void>{

        return this.categoriesService.deleteById(id);

    }

}
