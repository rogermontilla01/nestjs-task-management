import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
  await app.listen(3000);
}
bootstrap();
