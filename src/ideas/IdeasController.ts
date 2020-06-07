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
import { IdeaVotesService } from './votes/IdeaVotesService';
import { ParseBoolPipe } from '../_lib/pipe/ParseBoolPipe';
import { IdeaUserVote } from './IdeaUserVote';

@ApiTags('ideas')
@Controller('/ideas')
export class IdeasController {

    public constructor(private ideasService: IdeasService, private ideaVotesService: IdeaVotesService) {

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
    public async find(

        @Query() params: PaginationQuery<Idea>,
        @Principal() user: User,
        @Query('userVote', ParseBoolPipe) userVote: boolean,

    ): Promise<IdeaPaginationResponse> {

        const query = params.getFindManyOptions({

            queryFields: ['title', 'status', 'tags'],
            relations: ['tags', 'owner', 'category'],
            sortBy: ['title'],
            softDelete: true,

        });

        let [ideas, count] = await this.ideasService.findAndCount(query);

        if (userVote) ideas = await this.ideaVotesService.getIdeasUserVote(user.id, ideas);

        return new IdeaPaginationResponse([ideas, count], params);

    }


    @Get(':id')
    @HttpCode(200)
    @UseGuards(PrincipalGuard)
    @ApiResponse({ status: 200, type: IdeaResponse })
    public async getById(

        @Param('id') id: string,
        @Query() params: FilterQuery<Idea>,
        @Principal() user: User,
        @Query('userVote', new ParseBoolPipe()) userVote: boolean,

    ): Promise<IdeaResponse> {

        const query = params.getFindOneOptions({

            relations: ['owner', 'tags', 'category'],
            softDelete: true

        });

        let idea: IdeaUserVote = await this.ideasService.getById(id, query);
        
        if (userVote) idea = await this.ideaVotesService.getIdeaUserVote(user.id, idea);

        return new IdeaResponse(idea);

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
