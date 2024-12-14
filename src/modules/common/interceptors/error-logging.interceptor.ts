import {
  CallHandler,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class ErrorLoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(err => {
        // NOTE: exception에서 에러 놓친경우 internalServerError로 처리
        if (!err.status) {
          new Logger().error(err.stack);
          throw new InternalServerErrorException();
        }
        return throwError(() => {
          return err;
        });
      }),
    );
  }
}
