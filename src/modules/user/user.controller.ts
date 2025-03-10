import { Body, Controller, Get, Patch, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { ResponseTransform } from '../common/interceptors/response-transform.interceptor';
import { PatchProfileDto } from './dto/request-user.dto';

@UseInterceptors(new ResponseTransform())
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUser() {
    return this.userService.getUser();
  }

  @Patch()
  patchProfile(@Body() dto: PatchProfileDto) {
    return this.userService.patchProfile(dto);
  }
}
