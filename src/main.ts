// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(3000);
// }
// bootstrap();

import { NestFactory, Reflector } from '@nestjs/core';
import {
  ClassSerializerInterceptor,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { useContainer } from 'class-validator';

import {
  CommonHeaderGuard,
  ResponseErrorInterceptor,
  ResponseSuccessInterceptor,
} from './middlewares';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      validateCustomDecorators: true,
      transformOptions: { enableImplicitConversion: true },
      whitelist: true,
      // forbidNonWhitelisted: true
    }),
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalInterceptors(new ResponseSuccessInterceptor());
  app.useGlobalFilters(new ResponseErrorInterceptor());

  app.useGlobalGuards(new CommonHeaderGuard());

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: process.env.FRONTEND_URL, // atau '*'
    methods: 'GET,POST',
    allowedHeaders: 'Content-Type,Authorization',
  });
  // app.enableCors({
  //   origin: 'http://localhost:3000',
  // });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
