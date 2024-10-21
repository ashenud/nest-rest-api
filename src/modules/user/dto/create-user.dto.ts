import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { RoleType } from 'src/constants/role.type';
import { ToLowerCase } from 'src/decorators/transform.decorators';

export class CreateUserDto {
  @ApiPropertyOptional({ example: 'john.d@example.com', type: String })
  @ToLowerCase()
  @IsEmail()
  email: string;

  @ApiPropertyOptional()
  @MinLength(6)
  password: string;

  @ApiPropertyOptional()
  @IsEnum(RoleType)
  role: RoleType;

  @ApiPropertyOptional({ example: 'John', type: String })
  @IsOptional()
  @IsString()
  firstName?: string | null;

  @ApiPropertyOptional({ example: 'Doe', type: String })
  @IsOptional()
  @IsString()
  lastName?: string | null;

  @IsString()
  avatar?: string | null;
}
