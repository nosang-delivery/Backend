import { Body, Controller, Patch, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JoinDto, LoginDto } from './dto/request-auth';
import { ResponseTransform } from '../common/interceptors/response-transform.interceptor';
import { Public } from '../common/decorators/public.decorator';

@UseInterceptors(new ResponseTransform())
@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  signup(@Body() dto: JoinDto) {
    return this.authService.emailSignup(dto);
  }

  @Post()
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
