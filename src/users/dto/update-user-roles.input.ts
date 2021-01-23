import { Field, ID, InputType } from '@nestjs/graphql';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { Role } from '../enums/role.enum';

@InputType()
export class UpdateUserRolesDto {
  @Field(() => ID)
  @IsNumber()
  @IsOptional()
  id: number;

  @IsEnum(Role, { each: true })
  roles: Role[];
}
