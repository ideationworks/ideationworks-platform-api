import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Reflector }                                         from '@nestjs/core';
import { Request, Response }                                 from 'express';

import * as jwt         from 'jsonwebtoken';
import { UsersService } from '../users/UsersService';

/**
 * Principal Guard for protecting routes and automatically retrieving the users profile.
 */
@Injectable()
export class PrincipalGuard implements CanActivate {

    public constructor(@Inject('UsersService') private readonly usersService: UsersService,
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

                    const decoded = jwt.verify(split[ 1 ], process.env.JWT_SECRET || 'change');
                    const user = await this.usersService.getUserById(decoded[ 'id' ]);

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
