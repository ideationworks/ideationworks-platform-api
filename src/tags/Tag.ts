import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, Index } from 'typeorm';
import { Base } from '../_lib/Base';
import { TagStatus } from './TagStatus';

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
    
}
