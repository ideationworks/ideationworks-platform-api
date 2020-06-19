import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, Index, OneToOne, PrimaryColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Base } from '../_lib/Base';

@Entity('users_auth')
export class UsersAuth extends Base {

    @IsNotEmpty()
    @Column({ nullable: false })
    public email: string;

    @IsNotEmpty()
    @Column({ nullable: false })
    public authId: string;

}
