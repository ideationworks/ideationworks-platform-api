import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Base }                                  from '../_lib/Base';
import { User }                                  from '../users/User';

@Entity({ name: 'organizations' })
export class Organization extends Base {

    @Column()
    public name?: string;

    @ManyToMany(type => User, user => user.organization)
    @JoinTable({

        name: 'organizations_users_links',
        joinColumn: { name: 'organization_id' },
        inverseJoinColumn: { name: 'user_id' }

    })
    public users: Array<User>;

}
