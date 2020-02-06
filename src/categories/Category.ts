import { ApiProperty }           from '@nestjs/swagger';
import { Column, Entity, Index } from 'typeorm';
import { Base }                  from '../_lib/Base';

@Entity('categories')
@Index([ 'name' ], { unique: true })
export class Category extends Base {

    @ApiProperty()
    @Column({ nullable: false })
    public name: string;

    @ApiProperty()
    @Column({ nullable: false })
    public description: string;

}
