import { Controller, Param, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags }                            from '@nestjs/swagger';
import { Principal }                                         from '../../_lib/Principal';
import { PrincipalGuard }                                    from '../../_lib/PrincipalGuard';
import { User }                                              from '../../users/User';
import { IdeaVote }                                          from './IdeaVote';
import { IdeaVotesService }                                  from './IdeaVotesService';

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
    public up(@Principal() user: User, @Param('ideaId', ParseUUIDPipe) ideaId): Promise<IdeaVote> {

        return this.ideaVotesService.up(user, ideaId);

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
    public down(@Principal() user: User, @Param('ideaId', ParseUUIDPipe) ideaId): Promise<IdeaVote> {

        return this.ideaVotesService.down(user, ideaId);

    }

}
