import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JWTResponse } from './JWTResponse';
import { JWTData } from './JWTData';


const JWT_TOKEN = process.env.JWT_TOKEN || 'dev-jwt-token';
const JWT_EXPIRY = Number(process.env.JWT_EXPIRY) || 86400;

/**
 * Service To centralize operations related with authentication
 */
@Injectable()
export class AuthenticationService {

    /**
     * 
     * @param data data to be included in the jwt body
     */
    getSignedJWT(data: JWTData): JWTResponse {

        const token = jwt.sign(data, JWT_TOKEN, { expiresIn: JWT_EXPIRY });

        return {

            expiresIn: JWT_EXPIRY,
            token

        }

    }

    /**
     * Returns body data or throw an error if token is invalid
     * @param token json web token
     */
    getJWTData(token: string): JWTData {

        const decoded = jwt.verify(token, JWT_TOKEN);
        return decoded as JWTData;

    }

}