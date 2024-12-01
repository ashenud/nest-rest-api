import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { UUID } from 'crypto';
import { SalaryType } from 'src/common/types/job-role-related.type';

export class CreateJobRoleDto {
  @ApiProperty({ example: 'Software Engineer', type: String })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  @IsNotEmpty()
  companyId: UUID;

  @ApiProperty({
    example: SalaryType.MONTHLY,
    enum: SalaryType,
    default: SalaryType.MONTHLY,
  })
  @IsEnum(SalaryType)
  salaryType: SalaryType;

  @ApiProperty({ example: 5000, type: Number })
  @IsNumber()
  basicSalary: number;
}
