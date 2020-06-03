import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    Post,
    Query,
    UseGuards,
    UseInterceptors,
    Param,
    Delete,
    Put,
    HttpCode
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';

import { TagsService } from './TagsService';
import { TagResponse } from './TagResponse';
import { CreateTag } from './CreateTag';
import { plainToClass } from 'class-transformer';
import { Tag } from './Tag';
import { TagPaginationResponse } from './TagPaginationResponse';
import { FilterQuery } from '../_lib/common/queryFilter/FilterQuery';
import { UpdateTag } from './UpdateTag';

@ApiTags('tags')
@ApiBearerAuth()
@Controller('/tags')
export class TagsController {


    public constructor(private tagsService: TagsService) {

    }

    @Post('/')
    @HttpCode(201)
    //@UseGuards(PrincipalGuard)
    public async create(@Body() tag: CreateTag): Promise<TagResponse> {

        const newTag = await this.tagsService.create(plainToClass(Tag, tag));

        return new TagResponse(newTag);

    }

    @Get('/')
    @ApiResponse({ status: 200, type: TagPaginationResponse })
    public async find(@Query() params: FilterQuery<Tag>): Promise<TagPaginationResponse> {

        const query = params.getFindManyOptions({

            queryFields: ['name', 'status'],
            softDelete: true

        });

        const tags = await this.tagsService.findAndCount(query);

        return new TagPaginationResponse(tags, params);

    }

    @Get(':id')
    @ApiResponse({ status: 200, type: TagPaginationResponse })
    public async findById(@Param('id') id: string): Promise<TagResponse> {

        const tag = await this.tagsService.findById(id);

        return new TagResponse(tag);

    }

    @Put(':id')
    @HttpCode(200)
    public async update(@Param('id') id: string, @Body() tag: UpdateTag): Promise<TagResponse> {

        const updatedTag = await this.tagsService.UpdateById(id, tag);

        const response = new TagResponse(updatedTag);
        console.log(response);
        return new TagResponse(updatedTag);

    }

    @Delete(':id')
    @ApiResponse({ status: 204 })
    @HttpCode(204)
    public async deleteById(@Param('id') id: string): Promise<void> {

        return this.tagsService.deleteById(id);

    }

}
