import { SetMetadata } from '@nestjs/common';

export interface OwnershipConfig {
    service: string;
    resourceId: {
        type: 'query' | 'body' | 'params';
        name: string;
    };
}

export interface OwnershipService {

    isOwner: (userId: string, resourceId: string) => Promise<boolean>;

}

export const Ownership = (config: OwnershipConfig) => SetMetadata('OwnershipConfig', config);
