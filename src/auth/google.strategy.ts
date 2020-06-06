import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config } from 'dotenv';

import { Injectable } from '@nestjs/common';

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

  constructor() {
    super({

      clientID: "803356460721-a9lem751lfmg5ns699c9df202hv4ihdt.apps.googleusercontent.com",
      clientSecret: '77rOreod7IkkxCTvuJ9urXn1',
      callbackURL: 'http://localhost:3000/auth/google/callback',
      scope: ['email', 'profile']

    });
  }

  async validate (accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {

    const { name, emails, photos, id } = profile;

    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
      id
    };

    done(null, user);
  }
}