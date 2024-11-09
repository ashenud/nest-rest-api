import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard(['jwt']) {
  async canActivate(context: ExecutionContext) {
    const result = await super.canActivate(context);

    return result as boolean;
  }
}
