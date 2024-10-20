import { AbstractEntity } from 'src/common/entity/abstract.entity';
import { RoleType } from 'src/constants/role.type';
import { Column, Entity, VirtualColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity {
  @Column({ unique: true, type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'enum', enum: RoleType, default: RoleType.USER })
  role: RoleType;

  @Column({ nullable: true, type: 'varchar' })
  firstName?: string | null;

  @Column({ nullable: true, type: 'varchar' })
  lastName?: string | null;

  @Column({ nullable: true, type: 'varchar' })
  avatar?: string | null;

  @VirtualColumn({
    query: (alias) =>
      `SELECT CONCAT(${alias}.first_name, ' ', ${alias}.last_name)`,
  })
  fullName?: string;
}
