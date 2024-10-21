import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ClassTransformOptions, instanceToPlain } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class RoleSerializerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const user = request.user; // Assuming user is attached to the request

    // Determine the group based on the user's role
    const roleGroup = user && user.role === 'admin' ? 'admin' : 'user';

    return next.handle().pipe(
      map((data) => {
        // Automatically serialize using the group based on the role
        const options: ClassTransformOptions = {
          groups: [roleGroup],
        };
        return instanceToPlain(data, options);
      }),
    );
  }
}
