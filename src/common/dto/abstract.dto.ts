import { IsDate, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class AbstractDto {
  @IsUUID()
  id!: UUID;

  @IsDate()
  createdAt!: Date;

  @IsDate()
  updatedAt!: Date;
}
