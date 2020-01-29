import { Body, Controller, HttpException, HttpStatus, Post, Response, UnauthorizedException } from '@nestjs/common';
import { ApiBearerAuth, ApiTags }                                                             from '@nestjs/swagger';
import * as jwt                                                                               from 'jsonwebtoken';
import { UserLogin }                                                                          from './UserLogin';
import { UserRegister }                                                                       from './UserRegister';
import { UsersService }                                                                       from './UsersService';

@ApiTags('users')
@ApiBearerAuth()
@Controller('/users')
export class UsersController {

    public static JWT_TOKEN = 'change';
    public static JWT_EXPIRY = 86400;

    public constructor(private usersService: UsersService) {

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

            const token = jwt.sign({ id: user.id }, UsersController.JWT_TOKEN, { expiresIn: UsersController.JWT_EXPIRY });

            return response.status(HttpStatus.OK).json({ expiresIn: UsersController.JWT_EXPIRY, token });

        } else {

            throw new UnauthorizedException();

        }

    }

    @Post('/register')
    public async register(@Body() userRegister: UserRegister): Promise<string> {

        const user = await this.usersService.register(userRegister);

        console.log(user);

        if (user) {

            return 'OK';

        } else {

            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);

        }

    }

}
