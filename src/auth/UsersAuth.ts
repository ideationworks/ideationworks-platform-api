import { Column, Entity, ManyToOne, JoinColumn, Index } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Base } from '../_lib/Base';
import { User } from '../users/User';

@Entity('users_auth')
export class UsersAuth extends Base {

    @IsNotEmpty()
    @Column({ nullable: false })
    public email: string;

    @IsNotEmpty()
    @Index()
    @Column({ nullable: false })
    public authId: string;

    @IsNotEmpty()
    @Column({ length: 36 })
    public userId: string;

    @ManyToOne(type => User)
    @JoinColumn({ name: 'userId' })
    public user: User;

    @Index()
    @Column({ length: 50 })
    public provider: string;

}
