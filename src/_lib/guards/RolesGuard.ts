import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector }                                 from '@nestjs/core';
import { Request, Response }                         from 'express';

@Injectable()
export class RolesGuard implements CanActivate {

    public constructor(private readonly reflector: Reflector) {

    }

    public canActivate(context: ExecutionContext): boolean {

        const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
        const ctx = context.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();

        for (let i = 0; i < requiredRoles.length; i++) {

            if (request[ 'principal' ].roles.find(role => role.name === requiredRoles[ i ])) {

                return true;

            }

        }

        response.status(403).json({ message: 'Forbidden resource' });

    }

}
