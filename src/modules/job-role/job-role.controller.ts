import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateJobRoleDto } from './dto/create-job-role.dto';
import { UpdateJobRoleDto } from './dto/update-job-role.dto';
import { JobRoleService } from './job-role.service';

@Controller('job-role')
export class JobRoleController {
  constructor(private readonly jobRoleService: JobRoleService) {}

  @Post()
  create(@Body() createJobRoleDto: CreateJobRoleDto) {
    return this.jobRoleService.create(createJobRoleDto);
  }

  @Get()
  findAll() {
    return this.jobRoleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobRoleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobRoleDto: UpdateJobRoleDto) {
    return this.jobRoleService.update(+id, updateJobRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobRoleService.remove(+id);
  }
}
