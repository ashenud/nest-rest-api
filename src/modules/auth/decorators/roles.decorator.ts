import { SetMetadata } from '@nestjs/common';
import { RoleType } from 'src/constants/role.type'; // Adjust the path as needed

export const Roles = (...roles: RoleType[]) => SetMetadata('roles', roles);
