import { Expose } from 'class-transformer';
import { AbstractEntity } from 'src/common/entity/abstract.entity';
import {
  JobType,
  SalaryType,
  ShiftType,
} from 'src/common/types/job-role-related.type';
import { RoleType } from 'src/constants/role.type';
import { Company } from 'src/modules/company/entities/company.entity';
import { JobRole } from 'src/modules/job-role/entities/job-role.entity';
import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  Unique,
} from 'typeorm';

@Entity({ name: 'employees' })
@Unique(['company', 'user'])
export class Employee extends AbstractEntity {
  @Expose({ groups: [RoleType.ADMIN, RoleType.USER] })
  @Column({
    name: 'job_type',
    type: 'enum',
    enum: JobType,
    default: JobType.FULL_TIME,
  })
  jobType: JobType;

  @Expose({ groups: [RoleType.ADMIN, RoleType.USER] })
  @Column({ type: 'enum', enum: ShiftType, default: ShiftType.DAY })
  shift: ShiftType;

  @Expose({ groups: [RoleType.ADMIN, RoleType.USER] })
  @Column({
    name: 'salary_type',
    type: 'enum',
    enum: SalaryType,
    default: SalaryType.MONTHLY,
  })
  salaryType: SalaryType;

  @Expose({ groups: [RoleType.ADMIN, RoleType.USER] })
  @Column({ name: 'annual_leaves', type: 'double', nullable: true })
  annualLeaves: number | null;

  @Expose({ groups: [RoleType.ADMIN, RoleType.USER] })
  @Column({ name: 'week_off_days', type: 'json', nullable: true })
  weekOffDays: string[] | null;

  @Expose({ groups: [RoleType.ADMIN, RoleType.USER] })
  @ManyToOne(() => User, (user) => user.employees, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Expose({ groups: [RoleType.ADMIN, RoleType.USER] })
  @ManyToOne(() => Company, (company) => company.jobRoles, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @Expose({ groups: [RoleType.ADMIN, RoleType.USER] })
  @ManyToMany(() => JobRole, (jobRole) => jobRole.employees)
  @JoinTable({
    name: 'employee_job_roles',
    joinColumn: { name: 'employee_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'job_role_id', referencedColumnName: 'id' },
  })
  jobRoles: JobRole[];
}
