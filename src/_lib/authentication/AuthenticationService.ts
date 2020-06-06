import { Injectable } from "@nestjs/common";
import * as jwt from 'jsonwebtoken';
import { JWTResponse } from "./JWTResponse";
import { JWTData } from "./JWTData";


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

    // TODO: Implement Token validation
}