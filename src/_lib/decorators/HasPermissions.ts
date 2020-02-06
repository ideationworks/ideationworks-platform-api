import { SetMetadata } from '@nestjs/common';

export const HasRoles = (...permissions: string[]) => SetMetadata('permissions', permissions);
