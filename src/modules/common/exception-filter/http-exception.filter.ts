import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const defaultMessage = [exception.message];
    const exceptionRespons: any = exception.getResponse();
    const exceptionResponMessage = exceptionRespons?.message;

    const message = Array.isArray(exceptionResponMessage)
      ? exceptionResponMessage
      : [exceptionResponMessage];
    const error = exceptionRespons?.error;

    response.status(status).json({
      statusCode: status,
      message: message?.length ? message : defaultMessage,
      error: error ? error : 'Internal Server Error',
    });
  }
}
