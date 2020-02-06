import { Injectable }          from '@nestjs/common';
import { InjectRepository }    from '@nestjs/typeorm';
import { User }                from '../../users/User';
import { IdeasService }        from '../IdeasService';
import { IdeaVote }            from './IdeaVote';
import { IdeaVoteRespository } from './IdeaVoteRespository';

@Injectable()
export class IdeaVotesService {

    public constructor(@InjectRepository(IdeaVoteRespository) private ideaVoteRespository: IdeaVoteRespository,
                       private ideasService: IdeasService) {

    }

    /**
     * Create a new vote (up).
     *
     * @param {User} user
     * @param {string} ideaId
     *
     * @return {Promise<IdeaVote>}
     */
    public async up(user: User, ideaId: string): Promise<IdeaVote> {

        const idea = await this.ideasService.getById(ideaId);

        return this.ideaVoteRespository.save({

            idea,
            user,
            up: true

        });

    }

    /**
     * Create a new vote (down).
     *
     * @param {User} user
     * @param {string} ideaId
     *
     * @return {Promise<IdeaVote>}
     */
    public async down(user: User, ideaId: string): Promise<IdeaVote> {

        const idea = await this.ideasService.getById(ideaId);

        return this.ideaVoteRespository.save({

            idea,
            user,
            up: false

        });

    }

}
