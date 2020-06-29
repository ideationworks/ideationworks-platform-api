import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { BeforeInsert, BeforeUpdate, Column, Entity, Index, ManyToMany, OneToOne, JoinColumn } from 'typeorm';
import { Base } from '../_lib/Base';
import { Organization } from '../organizations/Organization';
import { UserStatus } from './UserStatus';
import { UsersAuth } from '../auth/UsersAuth';


@Entity('users')
@Index([ 'email' ], {unique: true})
export class User extends Base {

    @ManyToMany(type => Organization, organization => organization.users)
    public organization: Organization;

    @BeforeInsert()
    @BeforeUpdate()
    public async hashPassword() {

        if (this.password && !this.password.match(/\$2b\$10\$/)) {

            this.password = await bcrypt.hash(this.password, 10);

        }

    }

    @ApiProperty()
    @Column({nullable: true})
    @Exclude({toPlainOnly: true})
    public password?: string;

    @ApiProperty()
    @Column({nullable: true})
    public status?: UserStatus;

    @ApiProperty()
    @Column({nullable: true})
    public displayName?: string;

    @ApiProperty()
    @Column({nullable: true})
    public firstName?: string;

    @ApiProperty()
    @Column({nullable: true})
    public lastName?: string;

    @ApiProperty()
    @Column()
    public email?: string;

    @Column({nullable: true, length: 255})
    public forgotToken: string;

    @Column({nullable: true, length: 255})
    public confirmToken: string;

}
