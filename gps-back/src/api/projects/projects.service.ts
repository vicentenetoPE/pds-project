import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { User } from '../users/entity/user.entity';

@Injectable()
export class ProjectsService {

  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ){}

  async create(createProjectDto: CreateProjectDto, ownerId:number) {
    return this.projectRepository.save({...createProjectDto, owner:{id:ownerId}});
  }

  findAll(userId:number) {
    return this.projectRepository.find({where:{owner:{id:userId}}});
  }

  findOne(id: number) {
    return this.projectRepository.findOne({where:{id}});
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return this.projectRepository.update(id, updateProjectDto);
  }

  async remove(id: number) {
    return await this.projectRepository.delete(id);
  }
}
