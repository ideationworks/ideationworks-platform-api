//extends = lets you imherit properties and methods from another class

import { Column, Entity, ManyToMany, JoinTable, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Base } from '../_lib/Base';
import { Tag } from '../tags/Tag';
import { IdeaStatus } from './IdeaStatus';
import { Category } from '../categories/Category';
import { User } from '../users/User';
import { IdeaVote } from './votes/IdeaVote';

@Entity('ideas')
export class Idea extends Base {

    @Column()
    public title: string;

    @Column({ length: 4000 })
    public description: string;

    @Column()
    public ownerId: string;

    @OneToOne(type => User)
    public owner: User;

    @Column()
    public categoryId: string;

    @OneToOne(type => Category)
    public category: Category;

    @Column()
    public status: IdeaStatus

    @ManyToMany(type => Tag, tag => tag.ideas)
    @JoinTable({

        name: 'ideas_tags_links',
        joinColumn: { name: 'ideas_id' },
        inverseJoinColumn: { name: 'tags_id' }

    })
    public tags: Array<Tag>;

    @Column({ default: 0 })
    public votesDown?: number;

    @Column({ default: 0 })
    public votesUp?: number;

    @OneToMany(() => IdeaVote, (ideaVote) => ideaVote.idea)
    public votes: IdeaVote[]
}
