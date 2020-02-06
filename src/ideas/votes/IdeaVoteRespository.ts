import { EntityRepository, Repository } from 'typeorm';
import { IdeaVote }                     from './IdeaVote';

@EntityRepository(IdeaVote)
export class IdeaVoteRespository extends Repository<IdeaVote> {

}
