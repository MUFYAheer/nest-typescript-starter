import { InputType, PickType } from '@nestjs/graphql';
import { IsNumber, IsOptional } from 'class-validator';
import { CreateUserDto } from './create-user.input';

@InputType()
export class UpdateUserPasswordDto extends PickType(CreateUserDto, [
  'password',
  'confirmPassword',
]) {
  // @Field(() => ID)
  @IsNumber()
  @IsOptional()
  id: number;
}
