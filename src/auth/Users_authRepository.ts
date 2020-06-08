import { EntityRepository, Repository } from 'typeorm';
import { Users_auth } from './users_auth';

@EntityRepository(Users_auth)
export class Users_authRepository extends Repository<Users_auth> {

}
