import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ErrorInterceptor } from './common/error.interceptor';
import { EnvironmentVariables } from './env.validation';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService<EnvironmentVariables>>(
    ConfigService,
  );

  const options = new DocumentBuilder()
    .setTitle('Nest TypeScript Starter')
    .setDescription('Nest TypeScript starter API docs')
    .setVersion('1.0.0')
    .addTag('app', 'Application global module')
    .addTag('users', 'Users module')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app.useGlobalInterceptors(new ErrorInterceptor());

  app.enableCors();
  await app.listen(configService.get('PORT'));
}
bootstrap();
