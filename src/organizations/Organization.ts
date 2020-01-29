import { Column, Entity, ManyToMany } from 'typeorm';
import { Base }                       from '../_lib/Base';
import { User }                       from '../users/User';

@Entity({ name: 'organizations' })
export class Organization extends Base {

    @Column()
    public name?: string;

    @ManyToMany(type => User, user => user.organization)
    public users: Array<User>;

}
