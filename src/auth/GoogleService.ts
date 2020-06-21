import { Random } from './../_lib/common/Random';
import { UsersService } from './../users/UsersService';
import { GoogleUser } from './GoogleUser';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersAuthRepository } from './UsersAuthRepository';
import { User } from '../users/User';

@Injectable()
export class GoogleService {
    public constructor(

        @InjectRepository(UsersAuthRepository) private userAuthRepository: UsersAuthRepository,
        private usersService: UsersService,

    ) { }

    /**
     * Login Function to authenticate with google
     * @param user google user
     */
    public async authenticate(googleUser: GoogleUser): Promise<User> {

        if (!googleUser) throw new BadRequestException('No Google User provided');

        // Try to find a user already authenticated
        const authUserFound = await this.userAuthRepository.findOne({ where: { authId: googleUser.id, provider: 'google' } });

        // If the user is found that means that the user is already registered
        if (authUserFound) {

            return this.usersService.getUserById(authUserFound.userId);

        }

        //
        // If auth user is not found we check if a user already has used that email to register manually
        // if that the case we link the accounts
        //

        let user = await this.usersService.getByEmail(googleUser.email);

        //
        // If no user is found we need to register a new user for that since we don't have
        // a password we create a random password to be sure that the account cannot be access unless
        // a new password is requested (reset password)
        //

        if (!user) {

            const userToRegister: Partial<User> = {

                email: googleUser.email,
                firstName: googleUser.firstName,
                lastName: googleUser.lastName,
                displayName: `${googleUser.firstName} ${googleUser.lastName}`,
                password: Random.getRandomCryptoString(50),

            };

            user = await this.usersService.register(userToRegister);

        }

        await this.userAuthRepository.save({

            authId: googleUser.id,
            email: googleUser.email,
            userId: user.id,
            provider: 'google',

        });

        return user;

    }

}
