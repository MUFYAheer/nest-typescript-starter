import { IsEnum } from 'class-validator';
import { Role } from '../enums/role.enum';

export class UpdateUserRolesDto {
  @IsEnum(Role, { each: true })
  roles: Role[];
}
