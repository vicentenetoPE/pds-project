import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './api/auth/auth.module';
import { UsersModule } from './api/users/users.module';
import { PGConfig } from './config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { TasksModule } from './api/tasks/tasks.module';
import { ProjectsModule } from './api/projects/projects.module';
import { OrganizationsModule } from './api/organizations/organizations.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EventEmitterModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: PGConfig,
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    TasksModule,
    ProjectsModule,
    OrganizationsModule
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {

}
