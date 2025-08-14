import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe);
  
  const config = new DocumentBuilder ()
  .setTitle('Sistema Ventas')
  .setDescription('Sistema ventas (descripcion)')
  .setVersion('1.0')
  .addTag('ventas')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors();
  

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
