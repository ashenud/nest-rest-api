import { Expose } from 'class-transformer';
import { AbstractEntity } from 'src/common/entity/abstract.entity';
import { RoleType } from 'src/constants/role.type';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, ManyToOne, Unique } from 'typeorm';
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
  owner: User;
}
