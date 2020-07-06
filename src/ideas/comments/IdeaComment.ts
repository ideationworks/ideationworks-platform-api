import { Entity, Index, ManyToOne, Column, JoinColumn } from 'typeorm';
import { Base } from '../../_lib/Base';
import { User } from '../../users/User';
import { Idea } from '../Idea';

@Entity('ideas_comment')
export class IdeaComment extends Base {

    @Column({ length: 36 })
    ideaId: string;

    @Column({ length: 36 })
    userId: string;

    @ManyToOne(type => Idea)
    public idea: Idea;

    @ManyToOne(type => User)
    public user: User;

    @Column({length: 4000})
    public comment: string;

}
