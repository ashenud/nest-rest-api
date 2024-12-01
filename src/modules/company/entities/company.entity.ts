import { Expose } from 'class-transformer';
import { AbstractEntity } from 'src/common/entity/abstract.entity';
import { RoleType } from 'src/constants/role.type';
import { Employee } from 'src/modules/employee/entities/employee.entity';
import { JobRole } from 'src/modules/job-role/entities/job-role.entity';
import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Unique,
} from 'typeorm';
import { CompanyType } from '../company.type';

@Entity({ name: 'companies' })
@Unique(['name', 'owner'])
export class Company extends AbstractEntity {
  @Expose({ groups: [RoleType.ADMIN, RoleType.USER] })
  @Column({ type: 'varchar' })
  name: string;

  @Expose({ groups: [RoleType.ADMIN, RoleType.USER] })
  @Column({ type: 'enum', enum: CompanyType, default: CompanyType.SHOP })
  type: CompanyType;

  @Expose({ groups: [RoleType.ADMIN, RoleType.USER] })
  @Column({ type: 'varchar' })
  address: string;

  @Expose({ groups: [RoleType.ADMIN, RoleType.USER] })
  @Column({ nullable: true, type: 'varchar' })
  avatar?: string | null;

  @Expose({ groups: [RoleType.ADMIN, RoleType.USER] })
  @ManyToOne(() => User, (user) => user.companies, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @Expose({ groups: [RoleType.ADMIN, RoleType.USER] })
  @OneToMany(() => JobRole, (jobRole) => jobRole.company)
  jobRoles: JobRole[];

  @Expose({ groups: [RoleType.ADMIN, RoleType.USER] })
  @OneToMany(() => Employee, (employee) => employee.company)
  employees: Employee[];
}
