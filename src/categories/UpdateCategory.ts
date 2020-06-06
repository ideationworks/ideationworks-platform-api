import { ApiProperty }                     from '@nestjs/swagger';
import { Column, Entity, Index, OneToOne } from 'typeorm';
import { IsNotEmpty, IsOptional }          from "class-validator";
import { Base }                            from '../_lib/Base';
import { Category } from './Category';

@Index([ 'name' ], { unique: true })
export class UpdateCategory extends Base  {

    @ApiProperty()
    @IsNotEmpty()
    @Column({ nullable: false })
    public name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsOptional()
    public description: string;

    @OneToOne(type => Category, category => category.parent)
    public parent: Category;

}
