import { EntityRepository, Repository } from 'typeorm';
import { UsersAuth } from './UsersAuth';

@EntityRepository(UsersAuth)
export class UsersAuthRepository extends Repository<UsersAuth> {

}
