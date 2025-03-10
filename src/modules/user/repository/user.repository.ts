import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { User } from '../entity/user.entity';
import { ExceptionHandlingService } from '../../common/exception-handler/exception-handling.service';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(
    private dataSource: DataSource,
    private exceptionHandler: ExceptionHandlingService,
  ) {
    super(User, dataSource.createEntityManager());
  }
}
