import { UserAuthService } from '../UserAuthService';
import { UserReq } from '../../_lib/decorators/UserReq';
import { Controller, Get, UseGuards, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticationService } from '../../_lib/authentication/AuthenticationService';
import { Response } from 'express';
import { OAuthUser } from '../OAuthUser';

@Controller('auth')
export class GoogleController {
    constructor(private readonly userAuthService: UserAuthService, private authenticationService: AuthenticationService) { }

    @Get('/google')
    @UseGuards(AuthGuard('google'))
    async googleAuth() { }

    @Get('/google/callback')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@UserReq() googleUser: OAuthUser, @Res() res: Response): Promise<void> {

        const user = await this.userAuthService.authenticate(googleUser);

        const jwt = this.authenticationService.getSignedJWT({ id: user.id });

        const redirectUrl = `${process.env.WEBSITE_URL}/oauth/callback?accessToken=${jwt.token}`;

        res.redirect(redirectUrl);

    }

}