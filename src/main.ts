import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigSwagger } from './infra/config/configSwagger/configSwagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    cors: false,
  });
  app.enableCors();
  app.setGlobalPrefix('api');
  ConfigSwagger(app);

  await app.listen(process.env['PORT']);
}
bootstrap();
