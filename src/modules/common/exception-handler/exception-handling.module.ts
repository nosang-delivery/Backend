import { Global, Module } from '@nestjs/common';
import { ExceptionHandlingService } from './exception-handling.service';

@Global()
@Module({
  providers: [ExceptionHandlingService],
  exports: [ExceptionHandlingService],
})
export class ExceptionHandlingModule {}
