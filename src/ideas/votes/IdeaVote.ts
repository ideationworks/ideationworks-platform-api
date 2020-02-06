import { Entity, Index, ManyToOne } from 'typeorm';
import { Base }                     from '../../_lib/Base';
import { User }                     from '../../users/User';
import { Idea }                     from '../Idea';

@Entity('ideas_votes')
@Index([ 'idea', 'user' ], { unique: true })
export class IdeaVote extends Base {

    @ManyToOne(type => Idea)
    public idea: Idea;

    @ManyToOne(type => User)
    public user: User;

    public up: boolean;

}
