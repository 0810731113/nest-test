import { NestFactory } from '@nestjs/core';
import {ValidationPipe} from '@nestjs/common';
import { AppModule } from './app.module';
import {getHost} from './utils/util';
import {ConfigService} from '@nestjs/config';
import {createProxyMiddleware} from 'http-proxy-middleware';
import {logger} from './middleware/logger.middleware';
const cookieParser = require('cookie-parser') ;
const bodyParser = require('body-parser');
import * as express from 'express';
import {TransformInterceptor} from './interceptor/transform.interceptor';
import {HttpExceptionFilter} from './filter/http-exception.filter';
import {AllExceptionsFilter} from './filter/any-exception.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
// import path,{ join } from 'path';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(express.json()); // For parsing application/json
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: false }))
  // app.useGlobalPipes(new ValidationPipe())
  // app.useGlobalInterceptors(new TransformInterceptor());
  // app.useGlobalFilters(new AllExceptionsFilter())
  // app.useGlobalFilters(new HttpExceptionFilter())
  // app.useStaticAssets(path.join('public'));
  // app.useStaticAssets(path.join('public'));
  app.useStaticAssets(path.join('public'),{
    prefix: '/assets/',   //设置虚拟路径
  });
  app.setBaseViewsDir(path.join('views'));
  // app.setBaseViewsDir(path.join(__dirname, 'views'));
  app.setViewEngine('hbs');
  const configService = app.get(ConfigService);
  console.log(`-------------configService--------------`);
  console.log(configService);
  // app.setGlobalPrefix(`nest`)
  //app.setGlobalPrefix(configService.get('BASE'));
  app.use(logger);
  const proxyMidware = createProxyMiddleware({
    target: configService.get('TARGET'),
    changeOrigin:true,
    ws:true,
  });

  // if(process.env.NODE_ENV !== 'production'){
  //   app.use(
  //       configService.get('PUBLIC_PATH'),
  //       proxyMidware,
  //   )
  // }
  //
  // app.use(
  //     new RegExp(`^(?!${configService.get('BASE')}).+`),
  //     proxyMidware,
  // )
  const options = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('Nest zero to one')
      .setDescription('The nest-zero-to-one API description')
      .setVersion('1.0')
      .addTag('test')
      .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-doc', app, document);
  await app.listen(3333);
  console.log(`app is running on: ${await app.getUrl()}`);
  console.log(`app is running on: ${await getHost()}`);
}


bootstrap().catch((error) => {
  console.error(error);
  process.exit(1);
});
