import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {
  const serverConfig = config.get('server');
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);

  /*Enable cord for development use*/
  /*Use export NODE_ENV=development in your environment*/
  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  }

  const options = new DocumentBuilder()
    .setTitle('NestJS Tasks')
    .setDescription('Api para crear tareas usando nestjs')
    .setVersion('0.1')
    .addTag('tasks')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document, {
    explorer: true,
    swaggerOptions: { filter: true, showRequesDuration: true },
  });

  const port = process.env.PORT || serverConfig.port;
  await app.listen(port);
  logger.log(`Aplication listening on port ${port} `);
}
bootstrap();
