import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyLogger } from './utils/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = app.get(MyLogger);
  await app.listen(process.env.PORT ?? 5000, () => {
    logger.log(`Server is running on: ` + process.env.PORT);
  });
}
bootstrap();
