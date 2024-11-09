import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UUID } from 'crypto';
import { generateHash } from 'src/common/utils';
import { FindOptionsWhere } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    let password: string | undefined = undefined;

    if (createUserDto.password) {
      password = generateHash(createUserDto.password);
    }

    createUserDto.password = password;

    let email: string | null = null;

    if (createUserDto.email) {
      const userObject = await this.userRepository.findByEmail(
        createUserDto.email,
      );

      if (userObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            email: 'The email already exists',
          },
        });
      }

      email = createUserDto.email;
    }

    createUserDto.email = email;

    const user = this.userRepository.create(createUserDto);

    return this.userRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: UUID): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  findOneBy(findByData: FindOptionsWhere<User>): Promise<User | null> {
    return this.userRepository.findOneBy(findByData);
  }

  update(id: UUID, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: UUID) {
    return `This action removes a #${id} user`;
  }
}
