import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export const swaggerConfig = new DocumentBuilder()
.setTitle('Planify')
.setDescription('API para a disciplina de GPS')
.setVersion('1.0')
.addBearerAuth(
    { 
      description: `[just text field] Please enter token in following format: Bearer <JWT>`,
      name: 'Authorization',
      bearerFormat: 'Bearer',
      scheme: 'Bearer',
      type: 'http',
      in: 'Header'
    },
    'access-token',
  )
.build();
