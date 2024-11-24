import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from 'src/modules/company/entities/company.entity';
import { Repository } from 'typeorm';
import { CreateJobRoleDto } from './dto/create-job-role.dto';
import { UpdateJobRoleDto } from './dto/update-job-role.dto';
import { JobRole } from './entities/job-role.entity';
import { UUID } from 'crypto';

@Injectable()
export class JobRoleService {
  constructor(
    @InjectRepository(JobRole)
    private readonly jobRoleRepository: Repository<JobRole>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async create(createJobRoleDto: CreateJobRoleDto): Promise<JobRole> {
    const { companyId, ...jobRoleData } = createJobRoleDto;

    const company = await this.companyRepository.findOne({
      where: { id: companyId },
    });

    if (!company) {
      throw new NotFoundException(`Company with ID ${companyId} not found.`);
    }

    const jobRole = this.jobRoleRepository.create({
      ...jobRoleData,
      company,
    });

    return this.jobRoleRepository.save(jobRole);
  }

  findAll(): Promise<JobRole[]> {
    return this.jobRoleRepository.find({ relations: ['company'] });
  }

  async findOne(id: UUID): Promise<JobRole> {
    const jobRole = await this.jobRoleRepository.findOne({
      where: { id },
      relations: ['company'],
    });

    if (!jobRole) {
      throw new NotFoundException(`JobRole with ID ${id} not found.`);
    }

    return jobRole;
  }

  async update(id: UUID, updateJobRoleDto: UpdateJobRoleDto): Promise<JobRole> {
    const jobRole = await this.findOne(id);

    Object.assign(jobRole, updateJobRoleDto);

    return this.jobRoleRepository.save(jobRole);
  }

  async remove(id: UUID): Promise<void> {
    const jobRole = await this.findOne(id);

    await this.jobRoleRepository.remove(jobRole);
  }
}
