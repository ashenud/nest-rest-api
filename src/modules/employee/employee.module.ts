import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from '../company/entities/company.entity';
import { JobRole } from '../job-role/entities/job-role.entity';
import { User } from '../user/entities/user.entity';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { Employee } from './entities/employee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Company, Employee, JobRole, User])],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}
