import {
  ConflictException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { User } from 'src/modules/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async create(
    createCompanyDto: CreateCompanyDto,
    owner: User,
  ): Promise<Company> {
    // Check for duplicate company name for the same owner
    const existingCompany = await this.companyRepository.findOne({
      where: { name: createCompanyDto.name, owner },
    });

    if (existingCompany) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          name: 'You already have a company with this name.',
        },
      });
    }

    // Create and save new company
    const company = this.companyRepository.create({
      ...createCompanyDto,
      owner,
    });

    try {
      return await this.companyRepository.save(company);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException(
          'Company name already exists for this owner',
        );
      }
      throw error;
    }
  }

  async findAll(owner: User): Promise<Company[]> {
    return await this.companyRepository.find({
      where: { owner: { id: owner.id } },
      relations: ['owner'],
    });
  }

  async findOne(id: UUID, owner: User): Promise<Company> {
    const company = await this.companyRepository.findOne({
      where: { id, owner: { id: owner.id } },
    });

    if (!company) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          company: 'Company not found or you are not the owner.',
        },
      });
    }

    return company;
  }

  async update(
    id: UUID,
    updateCompanyDto: UpdateCompanyDto,
    owner: User,
  ): Promise<Company> {
    const company = await this.findOne(id, owner);

    // Update company details
    Object.assign(company, updateCompanyDto);

    try {
      return await this.companyRepository.save(company);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException(
          'Company name already exists for this owner',
        );
      }
      throw error;
    }
  }

  async remove(id: UUID, owner: User): Promise<void> {
    const company = await this.findOne(id, owner);
    await this.companyRepository.remove(company);
  }
}
