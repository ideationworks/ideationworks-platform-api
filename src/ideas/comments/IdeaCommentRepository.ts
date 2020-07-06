import { EntityRepository, Repository } from 'typeorm';
import { IdeaComment }                     from './IdeaComment';

@EntityRepository(IdeaComment)
export class IdeaCommentRepository extends Repository<IdeaComment> {

}
