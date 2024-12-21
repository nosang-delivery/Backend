import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthRequestDto } from './dto/auth.request';
import { UserRepository } from '../user/repository/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  async signIn(dto: AuthRequestDto) {
    const payload = { email: dto.email, nickname: dto.nickname };
    const access_token = this.jwtService.sign(payload);

    await this.userRepository.save(dto);

    return {
      payload,
      access_token,
    };
  }
}
