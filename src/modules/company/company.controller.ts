import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UUID } from 'crypto';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { RoleSerializerInterceptor } from 'src/interceptors/role-serializer.interceptor';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { User } from '../user/entities/user.entity';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';

@Controller('companies')
@ApiTags('companies')
@UseGuards(JwtAuthGuard, RoleGuard)
@UseInterceptors(RoleSerializerInterceptor)
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  create(
    @Body() createCompanyDto: CreateCompanyDto,
    @CurrentUser() owner: User,
  ): Promise<Company> {
    return this.companyService.create(createCompanyDto, owner);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@CurrentUser() owner: User): Promise<Company[]> {
    return this.companyService.findAll(owner);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: UUID,
    @CurrentUser() owner: User,
  ): Promise<Company> {
    const company = await this.companyService.findOne(id, owner);

    if (!company) {
      throw new NotFoundException('Company not found.');
    }

    return company;
  }

  @Patch(':id')
  update(
    @Param('id') id: UUID,
    @Body() updateCompanyDto: UpdateCompanyDto,
    @CurrentUser() owner: User,
  ): Promise<Company> {
    return this.companyService.update(id, updateCompanyDto, owner);
  }

  @Delete(':id')
  remove(@Param('id') id: UUID, @CurrentUser() owner: User): Promise<void> {
    return this.companyService.remove(id, owner);
  }
}
