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

export class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment = Environment.Development;

  @IsNumber()
  PORT = 3000;

  // start - TypeORM Configurations
  @IsString()
  TYPEORM_HOST = 'localhost';

  @IsString()
  TYPEORM_USERNAME = 'postgres';

  @IsString()
  TYPEORM_PASSWORD = 'postgres';

  @IsString()
  TYPEORM_DATABASE = 'postgres';

  @IsNumber()
  TYPEORM_PORT = 5432;

  @IsBoolean()
  TYPEORM_LOGGING = false;
  // end - TypeORM Configurations
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(
    EnvironmentVariables,
    normalizeEnvironmentVariables(config),
    {
      enableImplicitConversion: true,
    },
  );
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}

function normalizeEnvironmentVariables(config) {
  for (const key in config) {
    if (Object.prototype.hasOwnProperty.call(config, key)) {
      const element = config[key];
      if (!isNaN(element)) {
        config[key] = parseFloat(element);
      }
      if (element === '') {
        config[key] = element;
      }
      if (element === 'true') {
        config[key] = true;
      }
      if (element === 'false') {
        config[key] = false;
      }
    }
  }
  return config;
}
