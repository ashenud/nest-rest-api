import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from '../company/entities/company.entity';
import { JobRole } from './entities/job-role.entity';
import { JobRoleController } from './job-role.controller';
import { JobRoleService } from './job-role.service';

@Module({
  imports: [TypeOrmModule.forFeature([JobRole, Company])],
  controllers: [JobRoleController],
  providers: [JobRoleService],
})
export class JobRoleModule {}
