//extends = lets you imherit properties and methods from another class

import { ApiProperty }    from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { Base }           from '../_lib/Base';

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

}
