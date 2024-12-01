import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { Company } from 'src/modules/company/entities/company.entity';
import { JobRole } from 'src/modules/job-role/entities/job-role.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { In, Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(JobRole)
    private readonly jobRoleRepository: Repository<JobRole>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const { userId, companyId, jobRoleIds, ...employeeData } =
      createEmployeeDto;

    // Validate User
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) throw new NotFoundException('User not found');

    // Validate Company
    const company = await this.companyRepository.findOne({
      where: { id: companyId },
      relations: ['jobRoles'],
    });

    if (!company) throw new NotFoundException('Company not found');

    // Validate Job Roles
    if (jobRoleIds) {
      const jobRoles = await this.jobRoleRepository.find({
        where: { id: In(jobRoleIds) },
        relations: ['company'],
      });

      const invalidJobRoles = jobRoles.filter(
        (jobRole) => jobRole.company?.id !== companyId,
      );

      if (invalidJobRoles.length > 0) {
        throw new UnprocessableEntityException(
          'All job roles must belong to the same company as the employee',
        );
      }
    }

    // Create Employee
    const jobRoles = jobRoleIds
      ? await this.jobRoleRepository.findByIds(jobRoleIds)
      : [];
    const employee = this.employeeRepository.create({
      ...employeeData,
      user,
      company,
      jobRoles,
    });

    return this.employeeRepository.save(employee);
  }

  findAll(): Promise<Employee[]> {
    return this.employeeRepository.find();
  }

  async findOne(id: UUID): Promise<Employee> {
    const employee = await this.employeeRepository.findOne({
      where: { id },
    });

    if (!employee) {
      throw new NotFoundException(`employee with ID ${id} not found.`);
    }

    return employee;
  }

  async update(
    id: UUID,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<Employee> {
    const { jobRoleIds, companyId } = updateEmployeeDto;

    // Validate Employee Exists
    const employee = await this.findOne(id);

    if (!employee) throw new NotFoundException('Employee not found');

    // Validate Job Roles
    if (jobRoleIds) {
      const jobRoles = await this.jobRoleRepository.find({
        where: { id: In(jobRoleIds) },
        relations: ['company'],
      });

      const invalidJobRoles = jobRoles.filter(
        (jobRole) => jobRole.company.id !== companyId,
      );

      if (invalidJobRoles.length > 0) {
        throw new UnprocessableEntityException(
          'All job roles must belong to the same company as the employee',
        );
      }

      employee.jobRoles = jobRoles;
    }

    // Update Employee
    Object.assign(employee, updateEmployeeDto);
    return this.employeeRepository.save(employee);
  }

  async remove(id: UUID): Promise<void> {
    const employee = await this.findOne(id);

    await this.employeeRepository.remove(employee);
  }
}
