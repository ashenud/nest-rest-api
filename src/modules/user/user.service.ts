import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
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

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: UUID): Promise<User | null> {
    const user = this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async findOneBy(findByData: FindOptionsWhere<User>): Promise<User | null> {
    return this.userRepository.findOneBy(findByData);
  }

  async update(id: UUID, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    if (updateUserDto.password) {
      updateUserDto.password = generateHash(updateUserDto.password);
    }

    // Update user details
    Object.assign(user, updateUserDto);

    try {
      return await this.userRepository.save(user);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('User email you entered is already exists');
      }
      throw error;
    }
  }

  async remove(id: UUID) {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }
}
