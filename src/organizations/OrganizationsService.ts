import { Injectable }                     from '@nestjs/common';
import { InjectRepository }               from '@nestjs/typeorm';
import { ResourceAlreadyExistsException } from '../_lib/exceptions/ResourceAlreadyExistsException';
import { ResourceNotFoundException }      from '../_lib/exceptions/ResourceNotFoundException';
import { Organization }                   from './Organization';
import { OrganizationRepository }         from './OrganizationRepository';

@Injectable()
export class OrganizationsService {

    public constructor(@InjectRepository(OrganizationRepository) private organizationRepository: OrganizationRepository) {

    }

    /**
     * Retrieve an organization by it's name.
     *
     * @param {string} name
     * @returns {Promise<Organization>}
     *
     * @throws {ResourceNotFoundException} Thrown if no name could be found.
     */
    public async getByName(name: string): Promise<Organization> {

        const organization = await this.organizationRepository.getByName(name);

        if (!organization) {

            throw new ResourceNotFoundException('could not locate organization');

        } else {

            return organization;

        }

    }

    /**
     * Create a new organization.
     *
     * @param {Organization} organization
     * @returns {Promise<Organization>}
     *
     * @throws {ResourceAlreadyExistsException} Thrown if an organization by the same name already exists.
     */
    public async create(organization: Organization): Promise<Organization> {

        let existing: Organization;

        try {

            existing = await this.getByName(organization.name);

        } catch (e) {

            return this.organizationRepository.save(organization);

        }

        if (existing) {

            throw new ResourceAlreadyExistsException('organization by this name already exists');

        } else {

            return this.organizationRepository.save(organization);

        }

    }

}
