import { NestFactory } from '@nestjs/core';
import {ValidationPipe} from '@nestjs/common';
import { AppModule } from './app.module';
import {getHost} from './utils/util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  app.setGlobalPrefix(`nest`)
  await app.listen(3333);
  console.log(`app is running on: ${await app.getUrl()}`);
  console.log(`app is running on: ${await getHost()}`);
}
bootstrap().catch((error) => {
  console.error(error);
  process.exit(1);
});
