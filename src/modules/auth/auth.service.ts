import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UUID } from 'crypto';
import { AllConfigType } from 'src/config/config.type';
import { RoleType } from 'src/constants/role.type';
import { TokenType } from 'src/constants/token.type';
import { validateHash } from '../../common/utils';
import { User } from '../user/entities/user.entity';
import { UserRepository } from '../user/user.repository';
import { AuthDto } from './dto/auth.dto';
import { AuthTokenDto } from './dto/auth.token.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService<AllConfigType>,
    private userRepository: UserRepository,
  ) {}

  async createAccessToken(data: {
    role: RoleType;
    userId: UUID;
  }): Promise<AuthTokenDto> {
    return new AuthTokenDto({
      expiresIn: this.configService.getOrThrow('auth.expires', { infer: true }),
      accessToken: await this.jwtService.signAsync({
        userId: data.userId,
        type: TokenType.ACCESS_TOKEN,
        role: data.role,
      }),
    });
  }

  async validateUser(authDto: AuthDto): Promise<User> {
    const user = await this.userRepository.findByEmail(authDto.email);

    const isPasswordValid = await validateHash(
      authDto.password,
      user?.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        errors: {
          password: 'Incorrect email or password',
        },
      });
    }

    return user!;
  }
}
