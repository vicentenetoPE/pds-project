import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {

  constructor(
    private userService: UsersService
  ) {}

  @Get()
  async findAll(): Promise<any[]> {
    return this.userService.findAll();
  }

  @Post()
  async create(@Body() params: {
    id: number,
    name: string,
  }): Promise<User> {
    const res = await this.userService.create(new User(params));
    return res;
  }
}