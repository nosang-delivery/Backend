import { IsEmail, IsString } from 'class-validator';

export class AuthRequestDto {
  @IsEmail()
  email: string;

  @IsString()
  nickname: string;
}
