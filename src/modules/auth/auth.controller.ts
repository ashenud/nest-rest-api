import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { AuthPayloadDto } from './dto/auth.payload.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({
    type: AuthPayloadDto,
    description: 'User info with access token',
  })
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: AuthDto): Promise<AuthPayloadDto> {
    const user = await this.authService.validateUser(loginDto);

    const token = await this.authService.createAccessToken({
      userId: user.id,
      role: user.role,
    });

    return {
      user,
      token,
    };
  }
}
