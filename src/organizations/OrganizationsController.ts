import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Principal }              from '../_lib/Principal';
import { User }                   from '../users/User';
import { Organization }           from './Organization';
import { OrganizationCreate }     from './OrganizationCreate';
import { OrganizationsService }   from './OrganizationsService';

@ApiTags('organizations')
@ApiBearerAuth()
@Controller('/organizations')
export class OrganizationsController {

    public constructor(private organizationsService: OrganizationsService) {

    }

    @Post('/create')
    public create(@Principal() principal: User, @Body() organizationCreate: OrganizationCreate): Promise<Organization> {

        return this.organizationsService.create(principal, organizationCreate);

    }

}
