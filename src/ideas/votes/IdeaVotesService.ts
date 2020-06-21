import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../users/User';
import { IdeasService } from '../IdeasService';
import { IdeaVote } from './IdeaVote';
import { IdeaVoteRespository } from './IdeaVoteRespository';
import { IdeaVoteCount } from './IdeaVoteCount';
import { IdeaUserVote } from '../IdeaUserVote';
import { Idea } from '../Idea';

@Injectable()
export class IdeaVotesService {

    public constructor(@InjectRepository(IdeaVoteRespository) private ideaVoteRespository: IdeaVoteRespository,
        private ideasService: IdeasService) {

    }

    /**
    * Create or update a vote
    * @param user User Entity
    * @param ideaId Idea Id
    * @param vote up/down vote true/false
    */
    private async userVote(user: User, ideaId: string, vote: boolean): Promise<IdeaVote> {

        const idea = await this.ideasService.getById(ideaId);

        const ideaVote: IdeaVote = await this.ideaVoteRespository.findOne({ user, idea });

        let response: IdeaVote;

        if (ideaVote) {

            // If user already voted and vote did't change return 
            if (ideaVote.up === vote) return { ...ideaVote, user, idea };

            ideaVote.up = vote;
            response = await this.ideaVoteRespository.save(ideaVote)

        } else {

            // If no record found create a new one with the vote
            response = await this.ideaVoteRespository.save({

                idea,
                user,
                up: vote

            });

        }

        // Update count of ideas

        const count = await this.getVotesCount(ideaId);

        const ideaUpdated = await this.ideasService.updateById(ideaId, count);

        return { ...ideaVote, user, idea: ideaUpdated };

    }

    /**
     * Delete a vote
     * @param user User Entity
     * @param ideaId Idea Id
     * @param vote up/down vote true/false
     */
    private async removeUserVote(user: User, ideaId: string, vote: boolean): Promise<Idea> {

        const idea = await this.ideasService.getById(ideaId);

        const ideaVote: IdeaVote = await this.ideaVoteRespository.findOne({ user, idea });

        if (!ideaVote) throw new NotFoundException('User Vote was not found');

        if (ideaVote.up !== vote) throw new ConflictException(`User current vote up is ${ideaVote.up}`);

        await this.ideaVoteRespository.remove(ideaVote);

        const count = await this.getVotesCount(ideaId);

        return this.ideasService.updateById(ideaId, count);

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

        return this.userVote(user, ideaId, true);

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

        return this.userVote(user, ideaId, false);

    }

    /**
     * Remove user up vote
     * @param user user entity
     * @param ideaId idea identifier
     */
    public async removeUpVote(user: User, ideaId: string): Promise<Idea> {

        return this.removeUserVote(user, ideaId, true);

    }

    /**
     * Remove user up vote
     * @param user user entity
     * @param ideaId idea identifier
     */
    public async removeDownVote(user: User, ideaId: string): Promise<Idea> {

        return this.removeUserVote(user, ideaId, false);

    }

    /**
     * Get up/down votes count from an specific idea
     * @param ideaId  Idea Id
     */
    public async getVotesCount(ideaId: string): Promise<IdeaVoteCount> {

        const count = await this.ideaVoteRespository
            .createQueryBuilder('ideaVote')
            .select('SUM( ideaVote.up = :voteUp )', 'votesUp')
            .addSelect('SUM( ideaVote.up = :voteDown )', 'votesDown')
            .where('ideaVote.ideaId = :ideaId')
            .setParameters({

                ideaId,
                voteUp: true,
                voteDown: false,

            }).getRawOne();

        return {

            votesUp: parseInt(count.votesUp) || 0,
            votesDown: parseInt(count.votesDown) || 0

        };

    }

    //
    //NOTE: Methods created to avoid complex joins
    //The assumption is that there will be few items less than 100
    //where IN will not have a higher impact versus a JOIN
    //

    /**
     * Get an array of ideas with the user votes
     * @param userId User Id
     * @param ideas Ideas to add user vote
     */
    public async getIdeasUserVote(userId: string, ideas: IdeaUserVote[]): Promise<IdeaUserVote[]> {

        if (!ideas || ideas.length === 0) return ideas;

        const ideaDictionary: { [key: string]: IdeaUserVote } = {}
        const ideaIds: string[] = [];

        ideas.forEach((idea, index) => {

            ideaDictionary[idea.id] = idea;
            ideaIds.push(idea.id);

        });

        const votes = await this.ideaVoteRespository
            .createQueryBuilder('ideaVote')
            .where('userId = :userId', { userId })
            .andWhere('ideaId IN (:...ideaIds)', { ideaIds })
            .getMany();

        // The dictionary store objects, so we just need to update properties
        // since objects are references the original objects will be modified
        votes.forEach((vote, index) => {

            ideaDictionary[vote.ideaId].userVote = vote;

        });

        return ideas;

    }

    /**
     * Get a idea with the respective user vote
     * @param userId User Id
     * @param idea idea to add user vote
     */
    public async getIdeaUserVote(userId: string, idea: IdeaUserVote): Promise<IdeaUserVote> {

        const vote = await this.ideaVoteRespository
            .createQueryBuilder('ideaVote')
            .where('userId = :userId', { userId })
            .andWhere('ideaId = :ideaId', { ideaId: idea.id })
            .getOne();

        idea.userVote = vote;

        return idea;

    }

}