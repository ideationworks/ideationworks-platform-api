//extends = lets you imherit properties and methods from another class

import { Base } from '../_lib/Base';
import { Column, Entity } from 'typeorm';

@Entity('ideas')
export class Idea extends Base {

    @Column()
    public title: string;

    @Column()
    public description: string;

}
