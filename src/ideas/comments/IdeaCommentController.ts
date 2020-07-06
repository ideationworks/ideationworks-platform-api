import { UpdateIdeaComment } from './UpdateIdeaComment';
import { OwnershipGuard } from '../../_lib/guards/OwnershipGuard';
import { IdeaCommentPaginationResponse } from './IdeaCommentPaginationResponse';
import { PaginationQuery } from './../../_lib/common/pagination/PaginationQuery';
import { IdeaCommentResponse } from './IdeaCommentResponse';
import { PrincipalGuard } from './../../_lib/PrincipalGuard';
import { IdeaCommentService } from './IdeaCommentService';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { Controller, Param, Post, UseGuards, HttpCode, Body, Get, Query, Delete, Put } from '@nestjs/common';
import { Principal } from '../../_lib/Principal';
import { User } from '../../users/User';
import { CreateIdeaComment } from './CreateIdeaComment';
import { IdeaComment } from './IdeaComment';
import { Ownership } from '../../_lib/decorators/Ownership';

@ApiTags('comments')
@ApiBearerAuth()
@Controller('/ideas/:ideaId/comments')
export class IdeaCommentController {

    public constructor(private ideaCommentService: IdeaCommentService) {

    }

    @Post()
    @UseGuards(PrincipalGuard)
    @HttpCode(200)
    @ApiResponse({ status: 200, type: IdeaCommentResponse })
    public async create(
        @Principal() user: User,
        @Param('ideaId') ideaId: string,
        @Body() comment: CreateIdeaComment,
    ) {

        const newComment = await this.ideaCommentService.create({ userId: user.id, ideaId, ...comment });

        return new IdeaCommentResponse(newComment);

    }

    @Get()
    @UseGuards(PrincipalGuard)
    @HttpCode(200)
    @ApiResponse({ status: 200, type: IdeaCommentResponse })
    public async find(

        @Query() params: PaginationQuery<IdeaComment>,
        @Param('ideaId') ideaId: string,

    ) {

        params.addQuerySearch({ ideaId });

        const query = params.getFindManyOptions({

            queryFields: ['ideaId'],
            sortBy: ['stampCreated'],
            softDelete: true,

        });

        const comments = await this.ideaCommentService.findAndCount(query);

        return new IdeaCommentPaginationResponse(comments, params);

    }

    @Delete(':id')
    @UseGuards(PrincipalGuard, OwnershipGuard)
    @HttpCode(204)
    @ApiResponse({ status: 204 })
    @Ownership({ service: 'IdeaCommentService', resourceId: { type: 'params', name: 'id' } })
    public async deleteById(@Param('ideaId') ideaId: string, @Param('id') commentId: string) {

        await this.ideaCommentService.deleteById(commentId, { where: { ideaId } });

    }

    @Put(':id')
    @UseGuards(PrincipalGuard, OwnershipGuard)
    @HttpCode(200)
    @Ownership({ service: 'IdeaCommentService', resourceId: { type: 'params', name: 'id' } })
    public async updateById(

        @Param('ideaId') ideaId: string,
        @Param('id') commentId: string,
        @Body() comment: UpdateIdeaComment,

    ) {

        const updatedComment = await this.ideaCommentService.update({ id: commentId, ideaId }, comment);

        return new IdeaCommentResponse(updatedComment);
    }

}