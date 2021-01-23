import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PaginationQueryDto } from '../common/dto/pagination-query.input';
import { CreateUserDto } from './dto/create-user.input';
import { UpdateUserPasswordDto } from './dto/update-user-password.input';
import { UpdateUserRolesDto } from './dto/update-user-roles.input';
import { UpdateUserDto } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { UsersRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { fullName, email, password } = createUserDto;
    const userExists = await this.findOneByEmail(email);
    if (userExists) {
      throw new ConflictException(`Email ${email} already exists`);
    }
    const user = this.usersRepository.create({
      fullName,
      email,
      password: await this.hashPassword(password),
    });
    return this.usersRepository.save(user);
  }

  async findAll(
    paginationQuery: PaginationQueryDto,
  ): Promise<{
    users: User[];
    totalCount: number;
  }> {
    const { limit, offset } = paginationQuery;
    const [users, totalCount] = await this.usersRepository.findAndCount({
      skip: +offset,
      take: +limit,
    });
    return { users, totalCount };
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne(+id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({ email });
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(+id);
    return this.usersRepository.save({ ...user, ...updateUserDto });
  }

  async updatePassword(
    id: number,
    updateUserPasswordDto: UpdateUserPasswordDto,
  ): Promise<User> {
    const { password } = updateUserPasswordDto;
    const user = await this.findOne(+id);
    user.password = await this.hashPassword(password);
    return this.usersRepository.save(user);
  }

  async updateRoles(
    id: number,
    updateUserRolesDto: UpdateUserRolesDto,
  ): Promise<User> {
    const { roles } = updateUserRolesDto;
    const user = await this.findOne(+id);
    user.roles = roles;
    return this.usersRepository.save(user);
  }

  async remove(id: number): Promise<User> {
    const user = await this.findOne(+id);
    return this.usersRepository.softRemove(user, { reload: true });
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }
}
