import { JWTData } from '../../../dist/_lib/authentication/JWTData.interface';
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { AuthenticationService } from '../authentication/AuthenticationService';
import { ModuleRef, Reflector } from '@nestjs/core';
import { OwnershipService, OwnershipConfig } from 'src/_lib/decorators/Ownership';

@Injectable()
export class OwnershipGuard implements CanActivate {

    public constructor(

        private readonly moduleRef: ModuleRef,
        private readonly authenticationService: AuthenticationService,
        private readonly reflector: Reflector,

    ) {

    }

    public async canActivate(context: ExecutionContext) {

        const ctx = context.switchToHttp();
        const request = ctx.getRequest<Request>();

        const config: OwnershipConfig = this.reflector.get<OwnershipConfig>('OwnershipConfig', context.getHandler());
        let jwtData: JWTData;

        try {

            const split = request.headers.authorization.split(' ');
            jwtData = this.authenticationService.getJWTData(split[1]);

        } catch (e) {

            throw new UnauthorizedException('Invalid or expired Token');

        }

        const service: OwnershipService = this.moduleRef.get(config.service);

        if (!service || !service.isOwner) {

            throw new Error('Service do not have isOwner funchtion');

        }

        const resourceId = request[config.resourceId.type][config.resourceId.name];
        const userId = jwtData.id;

        if (resourceId && userId) {

            return service.isOwner(userId, resourceId);

        }

        return false;
    }



}