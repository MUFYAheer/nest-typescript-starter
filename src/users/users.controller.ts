import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UpdateUserRolesDto } from './dto/update-user-roles.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiConflictResponse({ description: 'Duplicate email' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(
    @Query() paginationQuery: PaginationQueryDto,
  ): Promise<{ users: User[]; totalCount: number }> {
    return this.usersService.findAll(paginationQuery);
  }

  @Get(':id')
  @ApiNotFoundResponse({ description: `User with id not found` })
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(+id);
  }

  @Put(':id')
  @ApiNotFoundResponse({ description: `User with id not found` })
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Patch(':id/password')
  @ApiNotFoundResponse({ description: `User with id not found` })
  updatePassword(
    @Param('id') id: number,
    @Body() updateUserPasswordDto: UpdateUserPasswordDto,
  ) {
    return this.usersService.updatePassword(+id, updateUserPasswordDto);
  }

  @Patch(':id/roles')
  @ApiNotFoundResponse({ description: `User with id not found` })
  updateRoles(
    @Param('id') id: number,
    @Body() updateRolesDto: UpdateUserRolesDto,
  ) {
    return this.usersService.updateRoles(+id, updateRolesDto);
  }

  @Delete(':id')
  @ApiNotFoundResponse({ description: `User with id not found` })
  remove(@Param('id') id: number) {
    return this.usersService.remove(+id);
  }
}
