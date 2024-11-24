import { Expose } from 'class-transformer';
import { AbstractEntity } from 'src/common/entity/abstract.entity';
import { SalaryType } from 'src/common/types/salary.type';
import { Company } from 'src/modules/company/entities/company.entity';
import { Column, Entity, ManyToOne, Unique } from 'typeorm';

@Entity({ name: 'job_roles' })
@Unique(['name', 'company'])
export class JobRole extends AbstractEntity {
  @Expose()
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Expose()
  @ManyToOne(() => Company, (company) => company.jobRoles, {
    onDelete: 'CASCADE',
  })
  company: Company;

  @Expose()
  @Column({ type: 'enum', enum: SalaryType, default: SalaryType.MONTHLY })
  salaryType: SalaryType;

  @Expose()
  @Column({ type: 'float', nullable: false })
  basicSalary: number;
}
