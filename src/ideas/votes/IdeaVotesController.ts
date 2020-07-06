import { Controller, Param, ParseUUIDPipe, Post, UseGuards, Delete, HttpCode } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { Principal } from '../../_lib/Principal';
import { PrincipalGuard } from '../../_lib/PrincipalGuard';
import { User } from '../../users/User';
import { IdeaVotesService } from './IdeaVotesService';
import { IdeaVoteResponse } from './IdeaVoteResponse';
import { IdeaResponse } from '../IdeaResponse';

@ApiTags('ideas')
@ApiBearerAuth()
@Controller('/ideas/:ideaId/votes')
export class IdeaVotesController {

    /**
     * Contructor
     *
     * @param {IdeaVotesService} ideaVotesService
     */
    public constructor(private ideaVotesService: IdeaVotesService) {

    }

    /**
     * Create a new vote (up).
     *
     * @param {User} user
     * @param ideaId
     *
     * @return {Promise<IdeaVote>}
     */
    @Post('/up')
    @UseGuards(PrincipalGuard)
    @ApiResponse({ status: 200, type: IdeaVoteResponse })
    public async up(@Principal() user: User, @Param('ideaId', ParseUUIDPipe) ideaId): Promise<IdeaVoteResponse> {

        const vote = await this.ideaVotesService.up(user, ideaId);

        return new IdeaVoteResponse(vote);

    }

    /**
     * Create a new vote (down).
     *
     * @param {User} user
     * @param ideaId
     *
     * @return {Promise<IdeaVote>}
     */
    @Post('/down')
    @UseGuards(PrincipalGuard)
    @ApiResponse({ status: 200, type: IdeaVoteResponse })
    public async down(@Principal() user: User, @Param('ideaId', ParseUUIDPipe) ideaId): Promise<IdeaVoteResponse> {

        const vote = await this.ideaVotesService.down(user, ideaId);

        return new IdeaVoteResponse(vote);

    }

    /**
     * Delete vote (up).
     *
     * @param {User} user
     * @param ideaId
     *
     * @return {Promise<Void>}
     */
    @Delete('/up')
    @UseGuards(PrincipalGuard)
    @HttpCode(200)
    @ApiResponse({ status: 200, type: IdeaResponse })
    public async removeUpVote(@Principal() user: User, @Param('ideaId', ParseUUIDPipe) ideaId): Promise<IdeaResponse> {

        const idea = await this.ideaVotesService.removeUpVote(user, ideaId);

        return new IdeaResponse(idea);
    }

    /**
     * Delete vote (down).
     *
     * @param {User} user
     * @param ideaId
     *
     * @return {Promise<Void>}
     */
    @Delete('/down')
    @UseGuards(PrincipalGuard)
    @HttpCode(200)
    @ApiResponse({ status: 200, type: IdeaResponse })
    public async removeDownVote(@Principal() user: User, @Param('ideaId', ParseUUIDPipe) ideaId): Promise<IdeaResponse> {

        const idea = await this.ideaVotesService.removeDownVote(user, ideaId);

        return new IdeaResponse(idea);

    }

}
