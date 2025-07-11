import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaExceptionFilter } from './common/error.handler';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    cors:true
  });
  await app.listen(process.env.PORT ?? 5001);
}
bootstrap();
