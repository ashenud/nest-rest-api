import { PartialType } from '@nestjs/swagger';
import { CreateJobRoleDto } from './create-job-role.dto';

export class UpdateJobRoleDto extends PartialType(CreateJobRoleDto) {}
