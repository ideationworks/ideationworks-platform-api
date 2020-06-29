import { OAuthUser } from './../OAuthUser';
import { PassportStrategy } from '@nestjs/passport';
import { VerifyCallback } from 'passport-oauth2';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-facebook';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {

    constructor() {

        super({

            clientID: process.env.FACEBOOK_APP_ID,
            clientSecret: process.env.FACEBOOK_APP_SECRET,
            callbackURL: `${process.env.SERVER_URL}/auth/facebook/callback`,
            profileFields: ['email', 'displayName', 'name', 'picture'],
            scope: ['email'],

        });

    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {

        const { id, displayName, name, photos, emails } = profile;

        const user: OAuthUser = {

            id,
            accessToken,
            displayName,
            firstName: name.givingName,
            lastName: name.familyName,
            email: emails[0].value,
            picture: photos[0].value,
            provider: 'facebook',

        };

        done(null, user);

    }

}
