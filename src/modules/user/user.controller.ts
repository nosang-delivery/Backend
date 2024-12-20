import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { ResponseTransform } from '../common/interceptors/response-transform.interceptor';

@UseInterceptors(new ResponseTransform())
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUser() {
    return this.userService.getUser();
  }
}
