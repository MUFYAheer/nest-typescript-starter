import { plainToClass } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsString,
  validateSync,
} from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Provision = 'provision',
}

enum Database {
  Postgres = 'postgres',
}

export class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment = Environment.Development;

  @IsNumber()
  PORT: number;

  // start - TypeORM Configurations
  @IsEnum(Database)
  TYPEORM_CONNECTION: Database = Database.Postgres;

  @IsString()
  TYPEORM_HOST = 'localhost';

  @IsString()
  TYPEORM_USERNAME = 'postgres';

  @IsString()
  TYPEORM_PASSWORD = 'postgres';

  @IsString()
  TYPEORM_DATABASE = 'postgres';

  @IsNumber()
  TYPEORM_PORT: number;

  @IsBoolean()
  TYPEORM_SYNCHRONIZE = false;

  @IsBoolean()
  TYPEORM_MIGRATIONS_RUN = true;

  @IsBoolean()
  TYPEORM_LOGGING = false;

  @IsString()
  TYPEORM_ENTITIES = 'dist/**/*.entity.js';

  @IsString()
  TYPEORM_MIGRATIONS = 'dist/migration/**/*.js';

  @IsString()
  TYPEORM_MIGRATIONS_DIR = 'src/migration';
  // end - TypeORM Configurations
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
