import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigSwagger } from './config/configSwagger/configSwagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    cors: false,
  });
  app.enableCors();
  // app.enableCors({
  //   origin: '*',
  //   allowedHeaders: '*',
  // });

  ConfigSwagger(app);

  await app.listen(process.env['PORT']);
}
bootstrap();
