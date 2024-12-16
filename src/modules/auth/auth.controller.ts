import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRequestDto } from './dto/auth.request';
import { ResponseTransform } from '../common/interceptors/response-transform.interceptor';

@UseInterceptors(new ResponseTransform())
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  signIn(@Body() dto: AuthRequestDto) {
    return this.authService.signIn(dto);
  }
}
