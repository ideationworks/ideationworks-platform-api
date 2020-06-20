import {Body, Controller, Get, Param, ParseUUIDPipe, Post, Put, ValidationPipe, Delete, Query} from '@nestjs/common';
import { ApiTags }                                           from '@nestjs/swagger';
import { CategoriesService }                                 from './CategoriesService';
import { Category }                                          from './Category';
import { DeleteResult } from 'typeorm';
import { UpdateCategory } from './UpdateCategory';
import { FilterCategoriesDto } from './FilterCategoriesDto';
import {PaginationQuery} from "../_lib/common/pagination/PaginationQuery";
import {Idea} from "../ideas/Idea";
import {IdeaPaginationResponse} from "../ideas/IdeaPagenationResponse";
import {CategoryPaginationResponse} from "./CategoryPaginationResponse";
import {FilterQuery} from "../_lib/common/queryFilter/FilterQuery";
import {IdeaResponse} from "../ideas/IdeaResponse";
import {CategoryResponse} from "./CategoryResponse";

@ApiTags('categories')
@Controller('/categories')
export class CategoriesController {

    public constructor(private categoriesService: CategoriesService) {

    }


    @Get()
    async getCategories(@Query() params: PaginationQuery<Category>) : Promise<CategoryPaginationResponse> {

        const query = params.getFindManyOptions({

            queryFields: ['name'],
            relations: ['categories'],
            sortBy: ['name'],
            softDelete: true,

        });

        const categories = await this.categoriesService.getCategories(query);

        return new CategoryPaginationResponse(categories, params);

    }


    @Get(':id')
    public async getById(@Param('id', ParseUUIDPipe) id: string, @Query() params: FilterQuery<Category>): Promise<CategoryResponse> {

        const query = params.getFindOneOptions({

            relations: ['categories'],
            softDelete: true

        });

        const category = await this.categoriesService.getById(id, query);

        return new CategoryResponse(category);

    }

    @Post()
    public create(@Body() category: Category): Promise<Category> {

        return this.categoriesService.create(category);

    }

    @Put(':id')
    public update(@Param('id') id: string, @Body() category: UpdateCategory) :Promise<UpdateCategory> {

        return this.categoriesService.updateCategory(id, category);

    }

    @Delete(':id')
    public delete(@Param('id', ParseUUIDPipe) id: string): Promise<void>{

        return this.categoriesService.deleteCategory(id);

    }

}
