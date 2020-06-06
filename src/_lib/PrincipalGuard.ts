import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request, Response } from 'express';

import { UsersService } from '../users/UsersService';
import { AuthenticationService } from './authentication/AuthenticationService';

/**
 * Principal Guard for protecting routes and automatically retrieving the users profile.
 */
@Injectable()
export class PrincipalGuard implements CanActivate {

    public constructor(@Inject('UsersService') private readonly usersService: UsersService,
        @Inject('AuthenticationService') private readonly authenticationService: AuthenticationService,
        private readonly reflector: Reflector) {

    }


    /**
     * Called before a route is executed.
     *
     * @param {ExecutionContext} context
     * @returns {Promise<boolean>}
     */
    public async canActivate(context: ExecutionContext): Promise<boolean> {

        const ctx = context.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();

        if (request.headers.authorization) {

            return new Promise<boolean>(async (resolve, reject) => {

                const split = request.headers.authorization.split(' ');

                try {

                    const jwtData = this.authenticationService.getJWTData(split[ 1 ]);
                    const user = await this.usersService.getUserById(jwtData.id);

                    if (user) {

                        // @ts-ignore
                        request.principal = user;

                        resolve(true);

                    } else {

                        response.status(401).json({ message: 'invalid or expired token' });

                    }

                    // const requiredPermissions = this.reflector.get<string[]>('permissions', context.getHandler());

                    // IdentityHelper.getMyProfile(split[ 1 ]).pipe(catchError(e => {
                    //
                    //     response.status(401).json({ message: 'invalid or expired token' });
                    //
                    //     return of(null);
                    //
                    // })).subscribe(user => {
                    //
                    //     if (user && user.successful) {
                    //
                    //         // @ts-ignore
                    //         request.principal = user.response;
                    //
                    //         resolve(true);
                    //
                    //     } else {
                    //
                    //         response.status(401).json({ message: 'invalid or expired token' });
                    //
                    //     }
                    //
                    // });

                } catch (e) {

                    response.status(401).json({ message: 'invalid or expired token' });

                }

            });

        } else {

            response.status(401).json({ message: 'invalid or expired token' });

        }

    }

}
