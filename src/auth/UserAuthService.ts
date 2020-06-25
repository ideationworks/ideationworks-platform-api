import { OAuthUser } from './OAuthUser';
import { Random } from './../_lib/common/Random';
import { UsersService } from './../users/UsersService';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersAuthRepository } from './UsersAuthRepository';
import { User } from '../users/User';

@Injectable()
export class UserAuthService {

    public constructor(

        @InjectRepository(UsersAuthRepository) private userAuthRepository: UsersAuthRepository,
        private usersService: UsersService,

    ) { }

    /**
     * Login Function to authenticate with a third party service
     * @param user oauth user
     */
    public async authenticate(oAuthUser: OAuthUser): Promise<User> {

        if (!oAuthUser) {

            throw new BadRequestException(`No user found for the provider ${oAuthUser.provider}`);

        }

        // Try to find a user already authenticated
        const authUserFound = await this.userAuthRepository.findOne({ where: { authId: oAuthUser.id, provider: oAuthUser.provider } });

        // If the user is found that means that the user is already registered
        if (authUserFound) {

            return this.usersService.getUserById(authUserFound.userId);

        }

        //
        // If auth user is not found we check if a user already has used that email to register manually
        // if that the case we link the accounts
        //

        let user = await this.usersService.getByEmail(oAuthUser.email);

        //
        // If no user is found we need to register a new user for that since we don't have
        // a password we create a random password to be sure that the account cannot be access unless
        // a new password is requested (reset password)
        //

        if (!user) {

            const userToRegister: Partial<User> = {

                email: oAuthUser.email,
                firstName: oAuthUser.firstName,
                lastName: oAuthUser.lastName,
                displayName: oAuthUser.displayName,
                password: Random.getRandomCryptoString(50),

            };

            user = await this.usersService.register(userToRegister);

        }

        await this.userAuthRepository.save({

            authId: oAuthUser.id,
            email: oAuthUser.email,
            userId: user.id,
            provider: oAuthUser.provider,

        });

        return user;

    }

}
