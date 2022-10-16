import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import * as process from 'process';

async function bootstrap() {
  console.log(process.env.PORT);
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.use(bodyParser.json({ limit: '10mb' }));
  await app.listen(process.env.PORT);
}
bootstrap();
