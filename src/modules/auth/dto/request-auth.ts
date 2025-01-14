import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class JoinDto {
  @IsEmail()
  email: string;

  @IsString()
  nickname: string;
}

export class LoginDto {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}
