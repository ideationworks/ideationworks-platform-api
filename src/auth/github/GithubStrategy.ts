import { OAuthUser } from './../OAuthUser';
import { PassportStrategy } from '@nestjs/passport';
import { VerifyCallback } from 'passport-oauth2';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-github2';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {

    constructor() {

        super({

            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: `${process.env.SERVER_URL}/auth/github/callback`,
            scope: ['user:email'],

        });

    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {

        const { id, login, avatar_url, name, emails } = profile;

        const user: OAuthUser = {

            id,
            accessToken,
            firstName: name,
            lastName: '',
            email: emails[0].value,
            picture: avatar_url,
            displayName: login,
            provider: 'github',

        };

        done(null, user);

    }

}
