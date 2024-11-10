import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UUID } from 'crypto';
import { RoleSerializerInterceptor } from 'src/interceptors/role-serializer.interceptor';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { RoleGuard } from '../auth/guards/role.guard';
import { RoleType } from 'src/constants/role.type';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('users')
@ApiTags('users')
@UseGuards(JwtAuthGuard, RoleGuard)
@UseInterceptors(RoleSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Roles(RoleType.ADMIN)
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: UUID): Promise<User> {
    const user = await this.userService.findOne(id);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  @Patch(':id')
  update(@Param('id') id: UUID, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: UUID) {
    return this.userService.remove(id);
  }
}
