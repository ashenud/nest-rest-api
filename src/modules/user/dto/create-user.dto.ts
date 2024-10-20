import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { ToLowerCase } from 'src/decorators/transform.decorators';
import { RoleType } from 'src/constants/role.type';
import { AbstractDto } from 'src/common/dto/abstract.dto';

export class CreateUserDto extends AbstractDto {
  @ApiPropertyOptional({ example: 'john.d@example.com', type: String })
  @Transform(ToLowerCase)
  @IsEmail()
  email: string;

  @ApiPropertyOptional()
  @MinLength(6)
  password: string;

  @ApiPropertyOptional()
  @IsEnum(RoleType)
  role: number;

  @ApiPropertyOptional({ example: 'John', type: String })
  @IsOptional()
  firstName?: string | null;

  @ApiPropertyOptional({ example: 'Doe', type: String })
  @IsOptional()
  lastName?: string | null;

  @IsString()
  avatar?: string | null;

  @ApiPropertyOptional()
  @IsBoolean()
  isActive: boolean;
}
