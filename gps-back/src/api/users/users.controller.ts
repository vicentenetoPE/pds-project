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
import { User } from './entity/user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiBearerAuth()
@ApiTags('Users')
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
