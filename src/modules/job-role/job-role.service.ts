import { Injectable } from '@nestjs/common';
import { CreateJobRoleDto } from './dto/create-job-role.dto';
import { UpdateJobRoleDto } from './dto/update-job-role.dto';

@Injectable()
export class JobRoleService {
  create(createJobRoleDto: CreateJobRoleDto) {
    return 'This action adds a new jobRole';
  }

  findAll() {
    return `This action returns all jobRole`;
  }

  findOne(id: number) {
    return `This action returns a #${id} jobRole`;
  }

  update(id: number, updateJobRoleDto: UpdateJobRoleDto) {
    return `This action updates a #${id} jobRole`;
  }

  remove(id: number) {
    return `This action removes a #${id} jobRole`;
  }
}
