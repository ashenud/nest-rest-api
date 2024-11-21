import { Module } from '@nestjs/common';
import { JobRoleController } from './job-role.controller';
import { JobRoleService } from './job-role.service';

@Module({
  controllers: [JobRoleController],
  providers: [JobRoleService],
})
export class JobRoleModule {}
