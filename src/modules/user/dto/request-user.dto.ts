import { IsString } from 'class-validator';

export class PatchProfileDto {
  @IsString()
  nickname: string;
}
