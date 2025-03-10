import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
  Scope,
  UnauthorizedException,
} from '@nestjs/common';

import { ErrorOptions, ErrorType } from './types/exception-handling';
import { CustomLoggerService } from '../logger/custom-logger.service';

export enum FAILURE_STATUS_CODE {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  NOT_ACCEPTABLE = 406,
  CONFLICT = 409,
  PAYLOAD_TOO_LARGE = 413,
  UNSUPPORTED_MEDIA = 415,
  UNPROCESSABLE = 422,
  INTERNAL = 500,
}

export enum SUCCESS_STATUS_CODE {
  OK = 200,
  CREATE = 201,
  NO_CONTENT = 204,
}

@Injectable({ scope: Scope.TRANSIENT })
export class ExceptionHandlingService {
  constructor(private logger: CustomLoggerService) {}

  private errorException: Record<ErrorType, any> = {
    INTERNAL: (message: string) => {
      throw new InternalServerErrorException(message);
    },
    CONFLICT: (message: string) => {
      throw new ConflictException(message);
    },
    UNAUTHORIZED: (message: string) => {
      throw new UnauthorizedException(message);
    },
    NOT_FOUND: (message: string) => {
      throw new NotFoundException(message);
    },
    NOT_ACCEPTABLE: (message: string) => {
      throw new NotAcceptableException(message);
    },
    BAD_REQUEST: (message: string) => {
      throw new BadRequestException(message);
    },
    FORBIDDEN: (message: string) => {
      throw new ForbiddenException(message);
    },
  };

  private fail(
    errorType: ErrorType,
    { message, error }: ErrorOptions,
    context?: string,
  ) {
    if (message) {
      const error = { name: 'failError', message };
      this.logger.error(error, context);
    }

    if (error) {
      this.logger.error(error, context);
    }

    this.errorException[errorType](message);
  }

  notFound(message?: string, context?: string) {
    this.fail('NOT_FOUND', { message }, context);
  }

  badRequest(message?: string, context?: string) {
    this.fail('BAD_REQUEST', { message }, context);
  }

  forbidden(message?: string, context?: string) {
    this.fail('FORBIDDEN', { message }, context);
  }

  conflict(message?: string, context?: string) {
    this.fail('CONFLICT', { message }, context);
  }

  notAcceptable(message?: string, context?: string) {
    this.fail('NOT_ACCEPTABLE', { message }, context);
  }

  unauthorized(message?: string, context?: string) {
    this.fail('UNAUTHORIZED', { message }, context);
  }

  internal(error: Error, context?: string) {
    this.fail('INTERNAL', { error }, context);
  }
}
