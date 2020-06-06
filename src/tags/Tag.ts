import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, Index, ManyToMany } from 'typeorm';
import { Base } from '../_lib/Base';
import { TagStatus } from './TagStatus';
import { Idea } from '../ideas/Idea';

@Entity('tags')
@Index(['name'], { unique: true })
export class Tag extends Base {

    @ApiProperty()
    @Column()
    public name: string;

    @ApiProperty()
    @Column({ nullable: true })
    public description?: string;

    @ApiProperty()
    @Column({ default: TagStatus.PENDING })
    public status: TagStatus;

    @ManyToMany(type => Idea, idea => idea.tags)
    public ideas: Idea[]

}
