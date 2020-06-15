import { Injectable } from '@nestjs/common';
import { InjectRepository }               from '@nestjs/typeorm';
import {UsersAuthRepository} from './UsersAuthRepository';
import { UsersAuth } from './UsersAuth';
import {User} from '../users/User';
import { UserRepository } from '../users/UserRepository';

@Injectable()
export class GoogleService {
  public constructor(

    @InjectRepository(UsersAuthRepository) private users_auth: UsersAuthRepository,
    @InjectRepository(UserRepository) private users: UserRepository

    ) {}

  async googleLogin(user) {

    if (!user) {

      return 'No user from google';

    }
    try{
      const user_auth = await this.users_auth.findOne({ where: { authId:user.id } });

      if(!user_auth){
          
        const authUser = new UsersAuth();
        authUser.email= user.email;
        authUser.authId = user.id;
        await this.users_auth.save(authUser);

        const newUser = new User();
        newUser.firstName = user.firstName;
        newUser.lastName = user.lastName;
        newUser.email = user.email;
        newUser.userAuth = authUser;
        await this.users.save(newUser);

        return user

      }else {
        return "already a user";
      }

    } catch(e) {
      throw new Error(e.message)
    }

  }
}