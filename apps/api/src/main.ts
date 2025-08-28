import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';

import * as express from 'express';
import * as session from 'express-session';

import { AppModule } from './app.module';

async function bootstrap() {
  const server = express();
  server.set('trust proxy', true);

  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.enableCors({
    origin: true,
    credentials: true,
  });
  app.use(
    session({
      secret: 'your-secret-key',
      resave: false,
      saveUninitialized: false,
      cookie: {
        domain: '.itso.kr',
        maxAge: 3600000,
      },
    }),
  );

  await app.listen(3001);
}
bootstrap();
