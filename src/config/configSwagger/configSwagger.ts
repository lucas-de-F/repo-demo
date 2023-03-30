import { INestApplication } from '@nestjs/common/interfaces/nest-application.interface';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export function ConfigSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Active Go')
    .setDescription('Software de gestão interna da Active Bi')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
}
