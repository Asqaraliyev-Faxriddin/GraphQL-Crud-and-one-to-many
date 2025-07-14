import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { graphqlUploadExpress } from 'graphql-upload-ts';


async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    cors:true
  });
  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 5 }));
  await app.listen(process.env.PORT ?? 5001);
}
bootstrap();
