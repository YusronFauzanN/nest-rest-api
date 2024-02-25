import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const globalPrefix = 'api';
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(3333);
  Logger.log(
    `🚀 Application is running on: http://localhost:3333/${globalPrefix}`,
  );
}
bootstrap();
