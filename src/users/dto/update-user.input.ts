import { InputType, OmitType, PartialType } from '@nestjs/graphql';
import { IsNumber, IsOptional } from 'class-validator';
import { CreateUserDto } from './create-user.input';

@InputType()
export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['password', 'confirmPassword']),
) {
  @IsNumber()
  @IsOptional()
  id: number;
}
