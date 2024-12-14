import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  private ENTITY_LOCATION = 'dist/src/modules/**/*.entity.{js, d.ts}';
  private TEST_ENTIYT_LOCATION = 'src/modules/**/*.entity.{js,ts}';
  private MIGRATION_LOCATION = 'dist/src/migrations/*{.ts,.js}';
  private SEED_LOCATION = 'dist/src/database/seeds/**/*.js';
  private FACTORY_LOCATION = 'dist/src/database/factories/**/*.js';

  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const postgresOption: PostgresConnectionOptions = {
      type: 'postgres',
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      username: this.configService.get<string>('DB_USERNAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB'),
    };

    return {
      ...postgresOption,
      entities: [this.getEntityLocation()],
      synchronize: this.configService.get<boolean>('DB_SYNCHRONIZE'),
      migrations: [this.MIGRATION_LOCATION],
      migrationsTableName: 'migrations',
    };
  }

  getEntityLocation() {
    const isTest = this.configService.get<string>('NODE_ENV') === 'TEST';
    if (isTest) {
      return this.TEST_ENTIYT_LOCATION;
    }
    return this.ENTITY_LOCATION;
  }

  // setSeedConfig() {
  //   return {
  //     seeds: [this.SEED_LOCATION],
  //     factories: [this.FACTORY_LOCATION],
  //   };
  // }

  // setOrmConfigFile(): void {
  //   const totalConfigs = {
  //     ...this.createTypeOrmOptions(),
  //     ...this.setSeedConfig(),
  //   };

  //   const hasFile = fs.existsSync('ormconfig.json');
  //   if (hasFile) {
  //     fs.unlinkSync('ormconfig.json');
  //   }
  //   fs.writeFileSync('ormconfig.json', JSON.stringify(totalConfigs, null, 2));
  // }
}
