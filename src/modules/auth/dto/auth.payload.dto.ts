import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/modules/user/entities/user.entity';
import { AuthTokenDto } from './auth.token.dto';

export class AuthPayloadDto {
  @ApiProperty({
    type: () => User,
  })
  user: User;

  token: AuthTokenDto;
}
