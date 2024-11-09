import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { UUID } from 'crypto';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AllConfigType } from 'src/config/config.type';
import { RoleType } from 'src/constants/role.type';
import { TokenType } from 'src/constants/token.type';
import { User } from 'src/modules/user/entities/user.entity';
import { UserRepository } from 'src/modules/user/user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService<AllConfigType>,
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('auth.secret', { infer: true }),
    });
  }

  async validate(args: {
    userId: UUID;
    role: RoleType;
    type: TokenType;
  }): Promise<User> {
    if (args.type !== TokenType.ACCESS_TOKEN) {
      throw new UnauthorizedException();
    }

    const user = await this.userRepository.findOneBy({
      id: args.userId,
      role: args.role,
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
