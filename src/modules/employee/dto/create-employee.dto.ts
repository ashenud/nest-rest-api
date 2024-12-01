import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { UUID } from 'crypto';
import {
  JobType,
  SalaryType,
  ShiftType,
} from 'src/common/types/job-role-related.type';

export class CreateEmployeeDto {
  @ApiProperty({
    example: 1,
    description: 'ID of the user associated with the employee',
  })
  @IsNotEmpty()
  @IsUUID()
  userId: UUID;

  @ApiProperty({
    example: 1,
    description: 'ID of the company the employee belongs to',
  })
  @IsNotEmpty()
  @IsUUID()
  companyId: UUID;

  @ApiPropertyOptional({
    description: 'List of job role IDs associated with the employee',
    type: [String],
    example: ['uuid-of-job_role-1', 'uuid-of-job_role-2'],
  })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  jobRoleIds?: UUID[];

  @ApiProperty({
    enum: JobType,
    default: JobType.FULL_TIME,
    description: 'Type of the job (full-time/part-time)',
  })
  @IsEnum(JobType)
  jobType: JobType;

  @ApiProperty({
    enum: ShiftType,
    default: ShiftType.DAY,
    description: 'Shift type for the employee (day/night)',
  })
  @IsEnum(ShiftType)
  shift: ShiftType;

  @ApiProperty({
    enum: SalaryType,
    default: SalaryType.MONTHLY,
    description: 'Salary type for the employee',
  })
  @IsEnum(SalaryType)
  salaryType: SalaryType;

  @ApiPropertyOptional({ example: 14, description: 'Number of annual leaves' })
  @IsOptional()
  @IsNumber()
  annualLeaves?: number;

  @ApiPropertyOptional({
    example: '["Saturday", "Sunday"]',
    description: 'Days off for the employee in JSON format',
  })
  @IsOptional()
  @IsArray()
  weekOffDays?: string[];
}
