import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Post,
    Query,
    Response,
    UnauthorizedException,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { Principal } from '../_lib/Principal';
import { PrincipalGuard } from '../_lib/PrincipalGuard';
import { User } from './User';
import { UserLogin } from './UserLogin';
import { UserPassword } from './UserPassword';
import { UserRegister } from './UserRegister';
import { UsersService } from './UsersService';
import { AuthenticationService } from '../_lib/authentication/AuthenticationService';
import { UserRegisterResponse } from './Response/UserRegisterResponse';
import { UserResponse } from './Response/UserResponse';

@ApiTags('users')
@ApiBearerAuth()
@Controller('/users')
export class UsersController {

    public constructor(
        private usersService: UsersService,
        private authenticationService: AuthenticationService) {
    }

    /**
     * Endpoint to perform login with an email address and password.
     * When successful a JWT token will be returned.
     *
     * @param response
     * @param {UserLogin} login
     *
     * @returns {Promise<(req: http.IncomingMessage, res: http.ServerResponse, next: createServer.NextFunction) => void>}
     *
     * @throws UnauthorizedException Thrown if the login credentials are invalid.
     */
    @Post('/login')
    public async login(@Response() response, @Body() login: UserLogin) {

        const user = await this.usersService.getByEmail(login.email);

        if (user) {

            const token = this.authenticationService.getSignedJWT({ id: user.id });

            return response.status(HttpStatus.OK).json(token);

        } else {

            throw new UnauthorizedException();

        }

    }

    /**
     * Creates a new user.
     *
     * @param {UserRegister} userRegister
     *
     * @returns {Promise<string>}
     */
    @Post('/register')
    @ApiResponse({ status: 201, type: UserRegisterResponse })
    public async register(@Body() userRegister: UserRegister): Promise<UserRegisterResponse> {


        const user = await this.usersService.register(userRegister);

        if (!user) throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);

        const token = this.authenticationService.getSignedJWT({ id: user.id });

        return UserRegisterResponse.create({ user, ...token });

    }

    /**
     * Retrieve the current logged in users profile.
     *
     * @param {Principal} principal
     *
     * @returns {Promise<User>}
     */
    @Get('/me')
    @UseGuards(PrincipalGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    public async getMyProfile(@Principal() principal: User): Promise<UserResponse> {

        const user = await this.usersService.getUserById(principal.id);

        return new UserResponse(user);

    }

    /**
     * Sends a reset password email.
     *
     * @param {string} email
     *
     * @returns {Promise<boolean>}
     */
    @Post('/reset/send')
    public forgotSend(@Query('email') email: string): Promise<boolean> {

        return this.usersService.resetSend(email);

    }

    /**
     * Change password if token matches.
     *
     * @param {string} token
     * @param {UserPassword} userPassword
     *
     * @returns {Promise<boolean>}
     */
    @Post('/reset/submit')
    public resetSubmit(@Query('token') token: string, @Body() userPassword: UserPassword): Promise<boolean> {

        return this.usersService.resetSubmit(token, userPassword.password);

    }

    @Post('/changePassword')
    @UseGuards(PrincipalGuard)
    public changePassword(@Principal() user: User, @Body() changePassword: UserPassword): Promise<User> {

        return this.usersService.changePassword(user, changePassword);

    }

}
