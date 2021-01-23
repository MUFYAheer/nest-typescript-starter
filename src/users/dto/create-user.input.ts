import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, Length } from 'class-validator';
import { Match } from '../../common/decorators/match.decorator';

@InputType()
export class CreateUserDto {
  @Field(() => String)
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
}
