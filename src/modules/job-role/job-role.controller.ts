import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UUID } from 'crypto';
import { CreateJobRoleDto } from './dto/create-job-role.dto';
import { UpdateJobRoleDto } from './dto/update-job-role.dto';
import { JobRole } from './entities/job-role.entity';
import { JobRoleService } from './job-role.service';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';

@Controller('job-roles')
@ApiTags('Job Roles')
@UseGuards(JwtAuthGuard, RoleGuard)
export class JobRoleController {
  constructor(private readonly jobRoleService: JobRoleService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createJobRoleDto: CreateJobRoleDto): Promise<JobRole> {
    return this.jobRoleService.create(createJobRoleDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<JobRole[]> {
    return this.jobRoleService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: UUID): Promise<JobRole> {
    return this.jobRoleService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: UUID,
    @Body() updateJobRoleDto: UpdateJobRoleDto,
  ): Promise<JobRole> {
    return this.jobRoleService.update(id, updateJobRoleDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: UUID): Promise<void> {
    return this.jobRoleService.remove(id);
  }
}
