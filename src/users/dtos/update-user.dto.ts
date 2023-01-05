import { IsOptional, IsString, IsEmail } from 'class-validator';

export class UpdateUserDTO {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  password: string;
}
