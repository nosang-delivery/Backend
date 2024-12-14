import { Injectable } from '@nestjs/common';
import { CustomLoggerService } from './modules/common/logger/custom-logger.service';

@Injectable()
export class AppService {
  constructor(private logger: CustomLoggerService) {}
  private serviceName = AppService.name;

  getHello(): string {
    this.logger.success('홈화면 접속 성공', this.serviceName);
    return 'Hello World!';
  }
}
