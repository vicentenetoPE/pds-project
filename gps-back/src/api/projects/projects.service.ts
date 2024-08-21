import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectsService {

  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ){}

  async create(createProjectDto: CreateProjectDto, ownerId:number) {
    return this.projectRepository.save({...createProjectDto, owner:{id:ownerId}});
  }

  async findAll(userId: number) {
    return await this.projectRepository.find({
      where: [
        { owner: { id: userId } },
        { members: { id: userId } }
      ],
      relations: ['owner', 'members'],
    });
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
