import {Body, Controller, Get, Param, ParseUUIDPipe, Post, Put, ValidationPipe, Delete, Query} from '@nestjs/common';
import { ApiTags }                                           from '@nestjs/swagger';
import { CategoriesService }                                 from './CategoriesService';
import { Category }                                          from './Category';
import { DeleteResult } from 'typeorm';
import { UpdateCategory } from './UpdateCategory';
import { FilterCategoriesDto } from './FilterCategoriesDto';

@ApiTags('categories')
@Controller('/categories')
export class CategoriesController {

    public constructor(private categoriesService: CategoriesService) {

    }

    @Get()
    public getAll(): Promise<Array<Category>> {

        return this.categoriesService.getAll();

    }


    @Get('/filter')
    getTasks(@Query(ValidationPipe) filterDto: FilterCategoriesDto) : Promise<Category[]>{
        return this.categoriesService.getFilterCategories(filterDto);
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
