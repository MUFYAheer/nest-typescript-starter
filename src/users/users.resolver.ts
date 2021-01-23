import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ApiTags } from '@nestjs/swagger';
import { PaginationQueryDto } from '../common/dto/pagination-query.input';
import { CreateUserDto } from './dto/create-user.input';
import { UpdateUserPasswordDto } from './dto/update-user-password.input';
import { UpdateUserRolesDto } from './dto/update-user-roles.input';
import { UpdateUserDto } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@ApiTags('users')
@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserDto,
  ): Promise<User> {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  async findAll(
    @Args('paginationQueryInput') paginationQueryInput: PaginationQueryDto,
  ): Promise<User[]> {
    const { users } = await this.usersService.findAll(paginationQueryInput);
    return users;
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User)
  updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  updatePassword(
    @Args('updateUserPasswordInput')
    updateUserPasswordInput: UpdateUserPasswordDto,
  ): Promise<User> {
    const { id } = updateUserPasswordInput;
    return this.usersService.updatePassword(+id, updateUserPasswordInput);
  }

  @Mutation(() => User)
  updateRoles(
    @Args('updateUserRolesInput') updateUserRolesInput: UpdateUserRolesDto,
  ): Promise<User> {
    const { id } = updateUserRolesInput;
    return this.usersService.updateRoles(+id, updateUserRolesInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number): Promise<User> {
    return this.usersService.remove(id);
  }
}
