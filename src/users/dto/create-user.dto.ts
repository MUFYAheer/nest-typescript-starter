import { IsEmail, IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { Match } from '../../common/decorators/match.decorator';
import { Role } from '../enums/role.enum';

export class CreateUserDto {
  @IsString()
  @Length(3, 45)
  fullName: string;

  @IsEmail()
  @Length(3, 45)
  email: string;

  @IsString()
  @Length(8, 45)
  password: string;

  @IsString()
  @Length(8, 45)
  @Match('password')
  confirmPassword: string;

  @IsEnum(Role, { each: true })
  @IsOptional()
  roles?: Role[];
}
