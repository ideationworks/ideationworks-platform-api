import { ApiProperty }                     from '@nestjs/swagger';
import { Column, Entity, Index, OneToOne } from 'typeorm';
import { IsNotEmpty }          from "class-validator";
import { Base }                            from '../_lib/Base';

@Entity('users_auth')
export class Users_auth {

    @ApiProperty()
    @IsNotEmpty()
    @Column({ nullable: false })
    public email: string;

    @ApiProperty()
    @IsNotEmpty()
    @Column({ nullable: false })
    public id: string;

}
