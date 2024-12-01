import { Expose } from 'class-transformer';
import { AbstractEntity } from 'src/common/entity/abstract.entity';
import { SalaryType } from 'src/common/types/job-role-related.type';
import { RoleType } from 'src/constants/role.type';
import { Company } from 'src/modules/company/entities/company.entity';
import { Employee } from 'src/modules/employee/entities/employee.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  Unique,
} from 'typeorm';

@Entity({ name: 'job_roles' })
@Unique(['name', 'company'])
export class JobRole extends AbstractEntity {
  @Expose({ groups: [RoleType.ADMIN, RoleType.USER] })
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Expose({ groups: [RoleType.ADMIN, RoleType.USER] })
  @Column({
    name: 'salary_type',
    type: 'enum',
    enum: SalaryType,
    default: SalaryType.MONTHLY,
  })
  salaryType: SalaryType;

  @Expose({ groups: [RoleType.ADMIN, RoleType.USER] })
  @Column({ name: 'basic_salary', type: 'float', nullable: false })
  basicSalary: number;

  @Expose({ groups: [RoleType.ADMIN, RoleType.USER] })
  @ManyToOne(() => Company, (company) => company.jobRoles, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @Expose({ groups: [RoleType.ADMIN, RoleType.USER] })
  @ManyToMany(() => Employee, (employee) => employee.jobRoles)
  employees: Employee[];
}
