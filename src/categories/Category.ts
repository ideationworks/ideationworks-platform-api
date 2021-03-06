import { ApiProperty }                     from '@nestjs/swagger';
import { Column, Entity, Index, OneToOne } from 'typeorm';
import { IsNotEmpty }          from "class-validator";
import { Base }                            from '../_lib/Base';

@Entity('categories')
@Index([ 'name' ], { unique: true })
export class Category extends Base {

    @ApiProperty()
    @IsNotEmpty()
    @Column({ nullable: false })
    public name: string;

    @ApiProperty()
    @IsNotEmpty()
    @Column({ nullable: false })
    public description: string;

    @OneToOne(type => Category, category => category.parent)
    public parent: Category;

}
