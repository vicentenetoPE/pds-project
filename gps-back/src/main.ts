import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: '*',
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const env = app.get(ConfigService);
  const SERVER_PORT = env.get<string>('APP_PORT') ?? '3003';

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(SERVER_PORT, '0.0.0.0');

  const address = await app.getUrl();
  console.log('Server is running on: ', address);
  
}
bootstrap();
