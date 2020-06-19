import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Random } from '../_lib/common/Random';
import { ResourceAlreadyExistsException } from '../_lib/exceptions/ResourceAlreadyExistsException';
import { ResourceNotFoundException } from '../_lib/exceptions/ResourceNotFoundException';
import { Sendgrid } from '../_lib/mail/Sendgrid';
import { Organization } from '../organizations/Organization';
import { OrganizationsService } from '../organizations/OrganizationsService';
import { User } from './User';
import { UserLogin } from './UserLogin';
import { UserRegister } from './UserRegister';
import { UserRepository } from './UserRepository';
import { UserStatus } from './UserStatus';
import { UserPassword } from './UserPassword';
import { FieldErrors } from '../_lib/common/errors/FieldErrors';

@Injectable()
export class UsersService {

    public constructor(@InjectRepository(UserRepository) private userRepository: UserRepository,
        private organizationsService: OrganizationsService) {

    }

    /**
     * Creates a user account only if the email address doesn't exist.
     *
     * @param {User} user
     *
     * @returns {Promise<User>}
     *
     * @throws {ResourceAlreadyExistsException} Throws if email address already exists.
     */
    public async create(user: User): Promise<User> {

        if (await this.getByEmail(user.email)) {

            const error = new FieldErrors('email', user.email, 'exists', 'user by this email already exists');

            throw new ResourceAlreadyExistsException(error.errors);

        } else {

            return this.userRepository.save(user);

        }

    }

    /**
     * Returns a user object (typically used for getting a profile via /my).
     *
     * @param {string} id Users UUID.
     *
     * @returns {Promise<User>}
     */
    public getUserById(id: string): Promise<User> {

        return new Promise(async (resolve, reject) => {

            const result = await this.userRepository.findOne({

                where: [ {id} ]

            });

            if (result) {

                resolve(result);

            } else {

                reject(new UnauthorizedException('could not locate user'));

            }

        });

    }

    /**
     * Retrieve a user object ONLY if the email and password matches.
     *
     * Note: This will take the plaintext password and automatically encrypt it!
     *
     * @param {string} email
     *
     * @returns {Promise<User>}
     */
    public async getByEmail(email: string): Promise<User> {

        return this.userRepository.findOne({

            where: [ {email} ]

        });

    }

    /**
     * User login.
     *
     * @param {UserLogin} userLogin
     *
     * @returns {Promise<void>}
     */
    public async login(userLogin: UserLogin) {

        const user = await this.getByEmail(userLogin.email);

        if (user) {

            if (await bcrypt.compare(userLogin.password, user.password)) {

                return new Promise((resolve, reject) => {

                    resolve(user);

                });

            }

        }

    }

    /**
     * Registers a new user by creating both the organization and user.
     *
     * @param {UserRegister} userRegister
     *
     * @returns {Promise<string>}
     */
    public async register(userRegister: UserRegister): Promise<User> {

        //
        // Verify that the email is not already in use
        //
        const userFound = await this.getByEmail(userRegister.email);

        if (userFound) {

            const error = new FieldErrors('email', userRegister.email, 'exists', `The email ${userRegister.email} is already in use`);
            throw new ResourceAlreadyExistsException(error.errors);

        }

        //
        // First create organization so we can later assignToUser it to the
        // user record that we'll created.
        //
        const organization: Organization = new Organization();

        organization.name = `${userRegister.email}'s team`;

        const newOrganization: Organization = await this.organizationsService.create(organization);

        //
        // Create user assigning the organization to it.
        //
        const user: User = new User();

        user.status = UserStatus.PENDING_CONFIRMATION;
        user.organization = newOrganization;
        user.displayName = userRegister.displayName;
        user.firstName = userRegister.firstName;
        user.lastName = userRegister.lastName;
        user.email = userRegister.email;
        user.password = userRegister.password;
        user.confirmToken = Random.getRandomCryptoString(100);

        //
        // Save the user object to the database.
        //
        const newUser = await this.create(user);

        //
        // Send the welcome email with the confirm token.
        //
        Sendgrid.send(newUser.email, 'support@ideation.works', 'd-b380c9ca4c2e4cc9973e82bbc91af953', {

            subject: 'Confirm your ideation account!',
            token: newUser.confirmToken,

        });

        return newUser;

    }

    /**
     * Send a password reset email and token.
     *
     * @param {string} email
     *
     * @returns {Promise<boolean>}
     */
    public async resetSend(email: string): Promise<boolean> {

        const user = await this.getByEmail(email);

        if (user) {

            user.forgotToken = Random.getRandomCryptoString(100);

            await this.userRepository.save(user);

            Sendgrid.send(user.email, 'support@ideation.works', 'd-1ff9d851587b494ea91c14da82d8f9b4', {

                subject: 'Reset your password',
                link: user.forgotToken

            });

            return true;

        } else {

            throw new ResourceNotFoundException('email does not exist');

        }

    }

    /**
     * Changes password if token matches.
     *
     * @param {string} token
     * @param {string} password
     *
     * @returns {Promise<boolean>}
     */
    public async resetSubmit(token: string, password: string): Promise<boolean> {

        const user = await this.userRepository.findOne({ where: { forgotToken: token } });

        if (user) {

            user.password = password;

            await this.userRepository.save(user);

            return true;

        } else {

            throw new ResourceNotFoundException('could not locate token');

        }

    }

    /**
     * changing users password
     * @param user
     * @param newPassword
     */
    public async changePassword(user: User, newPassword: UserPassword): Promise<User> {

        const userRecord = await this.getByEmail(user.email);

        userRecord.password = newPassword.password;

        return this.userRepository.save(userRecord);

    }

}
