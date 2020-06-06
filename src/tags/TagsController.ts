import {
    Body,
    Controller,
    Get,
    Post,
    Query,
    UseGuards,
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
import { PrincipalGuard } from '../_lib/PrincipalGuard';

@ApiTags('tags')
@ApiBearerAuth()
@Controller('/tags')
export class TagsController {


    public constructor(private tagsService: TagsService) {

    }

    @Post('/')
    @HttpCode(201)
    @UseGuards(PrincipalGuard)
    @ApiResponse({ status: 200, type: TagResponse })
    public async create(@Body() tag: CreateTag): Promise<TagResponse> {

        const newTag = await this.tagsService.create(plainToClass(Tag, tag));

        return new TagResponse(newTag);

    }

    @Get('/')
    @HttpCode(200)
    @UseGuards(PrincipalGuard)
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
    @HttpCode(200)
    @UseGuards(PrincipalGuard)
    @ApiResponse({ status: 200, type: TagResponse })
    public async findById(@Param('id') id: string): Promise<TagResponse> {

        const tag = await this.tagsService.findById(id);

        return new TagResponse(tag);

    }

    @Put(':id')
    @HttpCode(200)
    @UseGuards(PrincipalGuard)
    @ApiResponse({ status: 200, type: TagResponse })
    public async update(@Param('id') id: string, @Body() tag: UpdateTag): Promise<TagResponse> {

        const updatedTag = await this.tagsService.UpdateById(id, tag);

        return new TagResponse(updatedTag);

    }

    @Delete(':id')
    @HttpCode(204)
    @UseGuards(PrincipalGuard)
    @ApiResponse({ status: 204 })
    public async deleteById(@Param('id') id: string): Promise<void> {

        return this.tagsService.deleteById(id);

    }

}
