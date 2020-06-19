import { Injectable } from '@nestjs/common';
import { InjectRepository }               from '@nestjs/typeorm';
import {UsersAuthRepository} from './UsersAuthRepository';
import { UsersAuth } from './UsersAuth';
import {User} from '../users/User';
import { UserRepository } from '../users/UserRepository';
import {ResourceNotFoundException} from "../_lib/exceptions/ResourceNotFoundException";
import {ResourceAlreadyExistsException} from "../_lib/exceptions/ResourceAlreadyExistsException";

@Injectable()
export class GoogleService {
  public constructor(

    @InjectRepository(UsersAuthRepository) private usersAuth: UsersAuthRepository,
    @InjectRepository(UserRepository) private users: UserRepository

    ) {}

  async googleLogin(user: any) {

    if (!user) {

      return new ResourceNotFoundException("User does not exist");

    }
      const user_auth = await this.usersAuth.findOne({ where: { authId:user.id } });

      if(!user_auth) {
          
        const authUser = new UsersAuth();
        authUser.email= user.email;
        authUser.authId = user.id;
        await this.usersAuth.save(authUser);

        const newUser = new User();
        newUser.firstName = user.firstName;
        newUser.lastName = user.lastName;
        newUser.email = user.email;
        newUser.userAuth = authUser;
        await this.users.save(newUser);

        return user

      }else {
        return new ResourceAlreadyExistsException("User already exists");
      }
  }
}