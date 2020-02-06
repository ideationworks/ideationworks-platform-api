import { EntityRepository, Repository } from 'typeorm';
import { Idea } from './Idea';

@EntityRepository(Idea)
export class IdeaRepository extends Repository<Idea> {

}
