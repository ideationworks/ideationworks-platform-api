import { EntityRepository, Repository } from 'typeorm';
import { Tag }                         from './Tag';

@EntityRepository(Tag)
export class TagRepository extends Repository<Tag> {

}
