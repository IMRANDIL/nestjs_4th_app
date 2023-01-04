import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class createUserDTO {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
