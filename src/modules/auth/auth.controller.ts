import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRequestDto } from './dto/auth.request';
import { ResponseTransform } from '../common/interceptors/response-transform.interceptor';
import { Public } from '../common/decorators/public.decorator';

@UseInterceptors(new ResponseTransform())
@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  signup(@Body() dto: AuthRequestDto) {
    return this.authService.emailSignup(dto);
  }

  @Post()
  login(@Body() dto: AuthRequestDto) {
    return this.authService.login(dto);
  }
}
