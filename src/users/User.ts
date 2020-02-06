import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { BeforeInsert, BeforeUpdate, Column, Entity, Index, ManyToMany } from 'typeorm';
import { Base } from '../_lib/Base';
import { Organization } from '../organizations/Organization';
import { UserStatus } from './UserStatus';

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
    @Column()
    @Exclude({toPlainOnly: true})
    public password?: string;

    @ApiProperty()
    @Column()
    public status?: UserStatus;

    @ApiProperty()
    @Column({nullable: true})
    public firstname?: string;

    @ApiProperty()
    @Column({nullable: true})
    public lastname?: string;

    @ApiProperty()
    @Column()
    public email?: string;

    @Column({nullable: true, length: 255})
    public forgotToken: string;

    @Column({nullable: true, length: 255})
    public confirmToken: string;

}
