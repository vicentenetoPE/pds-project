import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiTags } from '@nestjs/swagger';
import { GetUserId } from '../auth/decorators/get-user-id';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@GetUserId() userId: number, @Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto, userId);
  }

  @Get()
  findAll(@GetUserId() userId: number) {
    return this.tasksService.findAll(userId);
  }

  @Get(':id')
  findOne(@GetUserId() userId: number, @Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @Patch(':id')
  update(@GetUserId() userId: number, @Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@GetUserId() userId: number, @Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
