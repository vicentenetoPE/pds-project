import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { ProjectsService } from '../projects/projects.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private projectService: ProjectsService,
  ) {}

  async create(createTaskDto: CreateTaskDto, userId: number) {
    const project = await this.projectService.findOne(createTaskDto.projectId);
    return this.taskRepository.save({
      ...createTaskDto,
      createdBy: { id: userId },
      project: project,
    });
  }

  findAll(userId: number) {
    return this.taskRepository.find({
      where: [{ createdBy: { id: userId } }, { assignees: { id: userId } }],
      relations: ['assignees'],
    });
  }

  findOne(id: number) {
    return this.taskRepository.findOne({ where: { id } });
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return this.taskRepository.update(id, updateTaskDto);
  }

  remove(id: number) {
    return this.taskRepository.delete(id);
  }
}
