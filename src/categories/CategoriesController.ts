import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ApiTags }                                           from '@nestjs/swagger';
import { CategoriesService }                                 from './CategoriesService';
import { Category }                                          from './Category';

@ApiTags('categories')
@Controller('/categories')
export class CategoriesController {

    public constructor(private categoriesService: CategoriesService) {

    }

    @Get()
    public getAll(): Promise<Array<Category>> {

        return this.categoriesService.getAll();

    }

    @Get('/:id')
    public getById(@Param(':id', ParseUUIDPipe) id: string): Promise<Category> {

        return this.categoriesService.getById(id);

    }

    @Post()
    public create(@Body() category: Category): Promise<Category> {

        return this.categoriesService.create(category);

    }

}
