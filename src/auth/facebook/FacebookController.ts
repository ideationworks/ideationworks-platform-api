import { UserAuthService } from './../UserAuthService';
import { UserReq } from '../../_lib/decorators/UserReq';
import { Controller, Get, UseGuards, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticationService } from '../../_lib/authentication/AuthenticationService';
import { Response } from 'express';
import { OAuthUser } from '../OAuthUser';

@Controller('auth')
export class FacebookController {
    constructor(private userAuthService: UserAuthService, private authenticationService: AuthenticationService) { }

    @Get('/facebook')
    @UseGuards(AuthGuard('facebook'))
    async githubAuth() { }

    @Get('/facebook/callback')
    @UseGuards(AuthGuard('facebook'))
    async githubAuthRedirect(@UserReq() facebookUser: OAuthUser, @Res() res: Response): Promise<void> {

        const user = await this.userAuthService.authenticate(facebookUser);

        const jwt = this.authenticationService.getSignedJWT({ id: user.id });

        const redirectUrl = `${process.env.WEBSITE_URL}/oauth/callback?accessToken=${jwt.token}`;

        res.redirect(redirectUrl);

    }

}
