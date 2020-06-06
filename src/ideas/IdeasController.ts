import { Body, Controller, Get, Post, UseGuards, Query, HttpCode, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Idea } from './Idea';
import { IdeasService } from './IdeasService';
import { CreateIdea } from './CreateIdea';
import { PrincipalGuard } from '../_lib/PrincipalGuard';
import { Principal } from '../_lib/Principal';
import { User } from '../users/User';
import { IdeaPaginationResponse } from './IdeaPagenationResponse';
import { FilterQuery } from '../_lib/common/queryFilter/FilterQuery';
import { IdeaResponse } from './IdeaResponse';
import { UpdateIdea } from './UpadateIdea';
import { PaginationQuery } from '../_lib/common/pagination/PaginationQuery';

@ApiTags('ideas')
@Controller('/ideas')
export class IdeasController {

    public constructor(private ideasService: IdeasService) {

    }

    @Post()
    @HttpCode(201)
    @UseGuards(PrincipalGuard)
    @ApiResponse({ status: 200, type: IdeaResponse })
    public async create(@Principal() principal: User, @Body() idea: CreateIdea): Promise<IdeaResponse> {

        const newIdea = await this.ideasService.create({ ownerId: principal.id, ...idea });

        return new IdeaResponse(newIdea);

    }

    @Get()
    @HttpCode(200)
    @UseGuards(PrincipalGuard)
    @ApiResponse({ status: 200, type: IdeaPaginationResponse })
    public async find(@Query() params: PaginationQuery<Idea>): Promise<IdeaPaginationResponse> {

        const query = params.getFindManyOptions({

            queryFields: ['title', 'status', 'tags'],
            relations: ['tags', 'owner', 'category'],
            sortBy: ['title'],
            softDelete: true,

        });

        const ideas = await this.ideasService.findAndCount(query);

        return new IdeaPaginationResponse(ideas, params);

    }


    @Get(':id')
    @HttpCode(200)
    @UseGuards(PrincipalGuard)
    @ApiResponse({ status: 200, type: IdeaResponse })
    public async getById(@Param('id') id: string, @Query() params: FilterQuery<Idea>): Promise<IdeaResponse> {

        const query = params.getFindOneOptions({

            relations: ['owner', 'tags', 'category'],
            softDelete: true

        });

        const tag = await this.ideasService.getById(id, query);

        return new IdeaResponse(tag);

    }

    @Put(':id')
    @HttpCode(200)
    @UseGuards(PrincipalGuard)
    @ApiResponse({ status: 200, type: IdeaResponse })
    public async update(@Param('id') id: string, @Body() idea: UpdateIdea): Promise<IdeaResponse> {

        const updatedIdea = await this.ideasService.updateById(id, idea);

        return new IdeaResponse(updatedIdea);

    }


    @Delete(':id')
    @HttpCode(204)
    @UseGuards(PrincipalGuard)
    @ApiResponse({ status: 204 })
    public async deleteById(@Param('id') id: string): Promise<void> {

        return this.ideasService.deleteById(id);

    }

    @Post('/:id/tags/:tagId')
    @HttpCode(201)
    @UseGuards(PrincipalGuard)
    @ApiResponse({ status: 201 })
    public async linkIdeaWithTags(@Param('id') ideaId: string, @Param('tagId') tagId: string): Promise<void> {

        return this.ideasService.linkTag(ideaId, tagId);

    }

    @Delete('/:id/tags/:tagId')
    @HttpCode(204)
    @UseGuards(PrincipalGuard)
    @ApiResponse({ status: 201 })
    public async unlinkIdeaWithTags(@Param('id') ideaId: string, @Param('tagId') tagId: string): Promise<void> {

        return this.ideasService.unlinkTag(ideaId, tagId);

    }



}
