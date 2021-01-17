import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvironmentVariables } from './env.validation';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService<EnvironmentVariables>>(
    ConfigService,
  );

  await app.listen(configService.get('PORT'));
}
bootstrap();
