import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { Public } from '../auth/decorators/is-public.decorator';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  async findAll(): Promise<any[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const res = await this.userService.findOneById(id);
    return res;
  }

  @Post()
  async create(@Body() params: { id: number; name: string }){
    const res = await this.userService.create(new User(params));
    return res;
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const res = await this.userService.delete(id);
    return res;
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() params: User) {
    const res = await this.userService.update(id, params);
    return res;
  }
}
