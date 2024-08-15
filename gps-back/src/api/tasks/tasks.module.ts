import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from './entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from '../projects/entities/project.entity';
import { ProjectsModule } from '../projects/projects.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), ProjectsModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
