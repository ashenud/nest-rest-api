import type { CanActivate, ExecutionContext } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleType } from 'src/constants/role.type';
import { User } from 'src/modules/user/entities/user.entity';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<RoleType[] | undefined>(
      'roles',
      context.getHandler(),
    );

    if (!roles?.length) {
      return true;
    }

    const request = context.switchToHttp().getRequest<{ user: User }>();
    const user = request.user;

    return roles.includes(user.role);
  }
}