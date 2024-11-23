import { Expose } from 'class-transformer';
import { AbstractEntity } from 'src/common/entity/abstract.entity';
import { RoleType } from 'src/constants/role.type';
import { Company } from 'src/modules/company/entities/company.entity';
import { Column, Entity, OneToMany, VirtualColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User extends AbstractEntity {
  @Expose({ groups: [RoleType.ADMIN, RoleType.USER] })
  @Column({ unique: true, type: 'varchar' })
  email: string;

  @Expose({ groups: [RoleType.ADMIN] })
  @Column({ type: 'varchar' })
  password: string;

  @Expose({ groups: [RoleType.ADMIN] })
  @Column({ type: 'enum', enum: RoleType, default: RoleType.USER })
  role: RoleType;

  @Expose({ groups: [RoleType.ADMIN, RoleType.USER] })
  @Column({ nullable: true, type: 'varchar' })
  firstName?: string | null;

  @Expose({ groups: [RoleType.ADMIN, RoleType.USER] })
  @Column({ nullable: true, type: 'varchar' })
  lastName?: string | null;

  @Expose({ groups: [RoleType.ADMIN, RoleType.USER] })
  @Column({ nullable: true, type: 'varchar' })
  avatar?: string | null;

  @Expose({ groups: [RoleType.ADMIN, RoleType.USER] })
  @VirtualColumn({
    query: (alias) =>
      `SELECT CONCAT(${alias}.first_name, ' ', ${alias}.last_name)`,
  })
  fullName?: string;

  @Expose({ groups: [RoleType.ADMIN, RoleType.USER] })
  @OneToMany(() => Company, (company) => company.owner)
  companies: Company[];
}
