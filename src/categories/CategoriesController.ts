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

@ApiTags('categories')
@Controller('/categories')
export class CategoriesController {

    public constructor(private categoriesService: CategoriesService) {

    }

    // @Get()
    // public getAll(): Promise<Array<Category>> {
    //
    //     return this.categoriesService.getAll();
    //
    // }


    @Get()
    async getCategories(@Query() params: PaginationQuery<Category>) : Promise<CategoryPaginationResponse> {

        const query = params.getFindManyOptions({

            queryFields: ['name'],
            relations: ['categories'],
            sortBy: ['name'],
            softDelete: true,

        });

        console.log(params)
        const categories = await this.categoriesService.getFilterCategories(query);

        return new CategoryPaginationResponse(categories, params);

    }


    @Get(':id')
    public getById(@Param('id', ParseUUIDPipe) id: string): Promise<Category> {

        return this.categoriesService.getById(id);

    }

    @Post()
    public create(@Body() category: Category): Promise<Category> {

        return this.categoriesService.create(category);

    }

    @Put()
    public update(@Body() category: UpdateCategory) :Promise<UpdateCategory> {

        return this.categoriesService.updateCategory(category);

    }

    @Delete(':id')
    public delete(@Param('id', ParseUUIDPipe) id: string): Promise<DeleteResult>{

        return this.categoriesService.deleteCategory(id);

    }

}
