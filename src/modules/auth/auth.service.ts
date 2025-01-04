import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JoinDto, LoginDto } from './dto/auth.request';
import { UserRepository } from '../user/repository/user.repository';
import { USER_ROLE } from '../common/enum/user.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  async emailSignup(dto: JoinDto) {
    const payload = { email: dto.email, nickname: dto.nickname };
    const access_token = this.jwtService.sign(payload);

    await this.userRepository.save({ ...dto, role: USER_ROLE.ADMIN });

    return {
      payload,
      access_token,
    };
  }

  async kakaoSignup(dto: JoinDto) {
    const payload = { email: dto.email, nickname: dto.nickname };
    const access_token = this.jwtService.sign(payload);

    await this.userRepository.save({ ...dto, role: USER_ROLE.USER });

    return {
      payload,
      access_token,
    };
  }

  async login(dto: LoginDto) {
    const payload = { email: dto.email };
    const access_token = this.jwtService.sign(payload);

    return {
      payload,
      access_token,
    };
  }
}
