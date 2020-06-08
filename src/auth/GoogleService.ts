import { Injectable } from '@nestjs/common';
import { InjectRepository }               from '@nestjs/typeorm';
import {Users_authRepository} from './Users_authRepository';
import { Users_auth } from './users_auth';
import {User} from '../users/User';
import { UserRepository } from '../users/UserRepository';

@Injectable()
export class GoogleService {
  public constructor(

    @InjectRepository(Users_authRepository) private users_auth: Users_authRepository,
    @InjectRepository(UserRepository) private users: UserRepository

    ) {}

  async googleLogin(req) {

    if (!req.user) {

      return 'No user from google';

    }
    try{
      const user_auth = await this.users_auth.findOne({ where: { authId:req.user.id } });

      if(!user_auth){
          
        const authUser = new Users_auth();
        authUser.email= req.user.email;
        authUser.authId = req.user.id;
        this.users_auth.save(authUser);
        console.log("SAVED !!")

        const user = new User();
        user.firstName = req.user.firstName;
        user.lastName = req.user.lastName;
        user.email = req.user.email;
        user.userAuth = authUser;
        this.users.save(user);

        return req.user

      }else {
        return "already a user"
      }

    } catch(e) {

      console.log(e);
    }
    // return {

    //   message: 'User information from google',
    //   user: req.user
      
    // }
  }
}