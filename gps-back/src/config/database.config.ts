import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export async function PGConfig(configService: ConfigService): Promise<TypeOrmModuleOptions> {
  const options: TypeOrmModuleOptions = {
    type: 'postgres',
    host: configService.get('DATABASE_HOST'),
    port: +configService.get('DATABASE_PORT'),
    username: configService.get('DATABASE_USER'),
    password: configService.get('DATABASE_PASSWORD'),
    database: configService.get('DATABASE_NAME'),
    synchronize: configService.get('IS_TESTING') === 'Y',
    logging: configService.get('NODE_ENV') !== 'production',
    autoLoadEntities: true,
    extra: {
      trustServerCertificate: true,
    },
    //TODO: adicionar os subscribers que são os listeners de eventos do typeorm para logs no banco
    subscribers: [],
  };

  return options;
}
