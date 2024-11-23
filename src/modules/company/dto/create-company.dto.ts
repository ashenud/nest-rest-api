import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { CompanyType } from '../company.type';

export class CreateCompanyDto {
  @ApiPropertyOptional({ example: 'TechCorp', type: String })
  @IsString()
  @MinLength(3)
  name: string;

  @ApiPropertyOptional({ example: 'SHOP', enum: CompanyType })
  @IsEnum(CompanyType)
  type: CompanyType;

  @ApiPropertyOptional({ example: '123 Tech Street', type: String })
  @IsString()
  address: string;

  @ApiPropertyOptional({ example: 'https://techcorp.com/logo.png', type: String })
  @IsOptional()
  @IsString()
  avatar?: string | null;
}
