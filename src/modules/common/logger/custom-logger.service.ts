import { ConsoleLogger, Injectable, Logger, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class CustomLoggerService extends ConsoleLogger {
  private logger = new Logger();
  info(message: string, context?: string) {
    return this.logger.log(message, context);
  }

  error(error: Error, context?: string) {
    return this.logger.error(`[ERROR] ${error.message}`, error.stack, context);
  }

  warn(message: string, context: string) {
    return this.logger.warn(message, context);
  }

  success(message: string, context?: string) {
    return this.info(`[SUCCESS] ${message}`, context);
  }
}
