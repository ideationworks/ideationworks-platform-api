//extends = lets you imherit properties and methods from another class

import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToMany, JoinTable } from 'typeorm';
import { Base } from '../_lib/Base';
import { Tag } from '../tags/Tag';

@Entity('ideas')
export class Idea extends Base {

    @ApiProperty()
    @Column()
    public title: string;

    @ApiProperty()
    @Column()
    public description: string;

    public votesDown?: number;
    public votesUp?: number;


    @ManyToMany(type => Tag)
    @JoinTable({

        name: 'ideas_tags_links',
        joinColumn: { name: 'ideas_id' },
        inverseJoinColumn: { name: 'tags_id' }

    })
    public tags: Array<Tag>;

}
