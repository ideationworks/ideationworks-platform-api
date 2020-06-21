//extends = lets you imherit properties and methods from another class

import { Column, Entity, ManyToMany, JoinTable, OneToOne, JoinColumn, OneToMany, ManyToOne } from 'typeorm';
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

    @Column({ length: 36 })
    public ownerId: string;

    @ManyToOne(type => User)
    @JoinColumn({ name: 'ownerId' })
    public owner: User;

    @Column()
    public categoryId: string;

    @ManyToOne(type => Category)
    @JoinColumn({ name: 'categoryId' })
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
