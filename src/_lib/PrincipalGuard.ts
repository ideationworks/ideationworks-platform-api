import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request, Response }                         from 'express';

import * as jwt from 'jsonwebtoken';

/**
 * Principal Guard for protecting routes and automatically retrieving the users profile.
 */
@Injectable()
export class PrincipalGuard implements CanActivate {

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

            return new Promise<boolean>((resolve, reject) => {

                const split = request.headers.authorization.split(' ');

                try {

                    const decoded = jwt.verify(split[ 1 ], process.env.JWT_SECRET || 'change');

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
