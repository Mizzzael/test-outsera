import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { patchNestJsSwagger } from 'nestjs-zod';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  patchNestJsSwagger();
  const config = new DocumentBuilder()
    .setTitle('Test Outsera')
    .setDescription('App para teste da vaga para Desenvolvedor Senior Outsera')
    .setVersion('1.0')
    .addTag('movies')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, swaggerDocument);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
