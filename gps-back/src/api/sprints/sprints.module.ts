import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sprint } from './sprints.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Sprint])],
 
  })
export class SprintsModule {}
