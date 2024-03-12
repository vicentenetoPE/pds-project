import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: "*",
    methods: "*"
  });
  const env = app.get(ConfigService);
  const SERVER_PORT = env.get<string>('APP_PORT') ?? '3003';


  await app.listen(SERVER_PORT, '0.0.0.0');
  const address = await app.getUrl();
  console.log('Server is running on: ', address);
}
bootstrap();
