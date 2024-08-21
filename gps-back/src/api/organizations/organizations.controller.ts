import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { ApiTags } from '@nestjs/swagger';
import { GetUserId } from '../auth/decorators/get-user-id';
import { User } from '../users/entity/user.entity';

@ApiTags('Organizations')
@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Post()
  create(@Body() createOrganizationDto: CreateOrganizationDto,  @GetUserId() userId: number) {
    return this.organizationsService.create(createOrganizationDto, userId);
  }

  @Get()
  findAll(@GetUserId() userId: number) {
    return this.organizationsService.findAll(userId);
  }

  

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organizationsService.findOne(+id);
  }

  // @Post(':id/members')
  // addMembers(@Body() members: User["id"][],  @GetUserId() userId: number, @Param('id') id: string) {
  //   return this.organizationsService.addMembers(+id, members, userId);
  // }

  // @Get(':id/members')
  // async findMembers(@Param('id') id: string, @Query() query: Record<string, string>) {
  //   return await this.organizationsService.findMembers(+id, query);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrganizationDto: UpdateOrganizationDto) {
    return this.organizationsService.update(+id, updateOrganizationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organizationsService.remove(+id);
  }
}
