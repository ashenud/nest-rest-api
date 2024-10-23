import { IsNumber, IsString } from 'class-validator';

export class AuthTokenDto {
  @IsNumber()
  expiresIn: number;

  @IsString()
  accessToken: string;

  constructor(data: { expiresIn: number; accessToken: string }) {
    this.expiresIn = data.expiresIn;
    this.accessToken = data.accessToken;
  }
}
