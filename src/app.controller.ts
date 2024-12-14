import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './modules/common/decorators/public.decorator';
import { ResponseTransform } from './modules/common/interceptors/response-transform.interceptor';

@Controller()
@UseInterceptors(new ResponseTransform())
@Public()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
