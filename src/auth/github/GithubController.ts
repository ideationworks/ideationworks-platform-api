import { UserAuthService } from './../UserAuthService';
import { UserReq } from '../../_lib/decorators/UserReq';
import { Controller, Get, UseGuards, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticationService } from '../../_lib/authentication/AuthenticationService';
import { Response } from 'express';
import { OAuthUser } from '../OAuthUser';

@Controller('auth')
export class GithubController {
    constructor(private userAuthService: UserAuthService, private authenticationService: AuthenticationService) { }

    @Get('/github')
    @UseGuards(AuthGuard('github'))
    async githubAuth() { }

    @Get('/github/callback')
    @UseGuards(AuthGuard('github'))
    async githubAuthRedirect(@UserReq() githubUser: OAuthUser, @Res() res: Response): Promise<void> {

        const user = await this.userAuthService.authenticate(githubUser);

        const jwt = this.authenticationService.getSignedJWT({ id: user.id });

        const redirectUrl = `${process.env.WEBSITE_URL}/oauth/callback?accessToken=${jwt.token}`;

        res.redirect(redirectUrl);

    }

}