import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyLogger } from './utils/logger';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = app.get(MyLogger);
  app.use(cookieParser());

  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Chat box offices')
    .setDescription('The chat box API description')
    .setVersion('0.1')
    // .addBearerAuth(
    //   {
    //     type: 'http',
    //     scheme: 'bearer',
    //     bearerFormat: 'JWT',
    //     name: 'JWT',
    //     in: 'header',
    //   },
    //   'jwt',
    // )
    .build();
  const documentFactory = () =>
    SwaggerModule.createDocument(app, config, { ignoreGlobalPrefix: true });
  SwaggerModule.setup('api', app, documentFactory);

  //validation data
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  app.useWebSocketAdapter(new IoAdapter(app));

  await app.listen(process.env.PORT ?? 5000, () => {
    logger.log(`Server is running on: ` + process.env.PORT);
  });
}
bootstrap();
