import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Organization } from './entities/organization.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entity/user.entity';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  create(createOrganizationDto: CreateOrganizationDto, userId: number) {
    return this.organizationRepository.save({
      ...createOrganizationDto,
      owner: { id: userId },
    });
  }

  // async addMembers(organizationId: number, members: number[], userId: number): Promise<Organization> {
  //   const organization = await this.organizationRepository.findOne({
  //     relations: ['owner', 'members'],
  //     where: { id: organizationId },
  //   });
  //   if (!organization) throw new NotFoundException('Organization not found');

  //   const users = await this.userRepository.findByIds(members);
  //   if (!users) {
  //     throw new NotFoundException('Users not found');
  //   }

  //   if (organization.owner.id !== userId) {
  //     throw new NotFoundException('You are not the owner of this organization');
  //   }

  //   organization.members = [...organization.members, ...users];
  //   return this.organizationRepository.save(organization);
  // }

  async findAll(userId: number) {
    const queryBuilder = this.organizationRepository.createQueryBuilder('organization')
      .leftJoinAndSelect('organization.members', 'member')
      .where('organization.ownerId = :userId', { userId })
      .loadRelationCountAndMap('organization.memberCount', 'organization.members');

    const organizations = await queryBuilder.getMany();
    return organizations.map(org => ({
      ...org,
      memberCount: org['memberCount'] || 0,
    }));
  }

  // async findMembers(organizationId: number, query: Record<string, string>): Promise<User[]> {
  //   const organization = await this.organizationRepository.findOne({
  //     relations: ['members'],
  //     where: { id: organizationId },
  //   });

  //   if (!organization) {
  //     throw new NotFoundException('Organization not found');
  //   }

  //   const queryBuilder = this.organizationRepository
  //     .createQueryBuilder('organization')
  //     .leftJoinAndSelect('organization.members', 'member')
  //     .where('organization.id = :organizationId', { organizationId });

  //   Object.keys(query).forEach((key) => {
  //     queryBuilder.andWhere(`member.${key} LIKE :${key}`, { [key]: `%${query[key]}%` });
  //   });

  //   const result = await queryBuilder.getOne();

  //   return result ? result.members : [];
  // }

  findOne(id: number) {
    return this.organizationRepository.findOne({ where: { id } });
  }

  update(id: number, updateProjectDto: UpdateOrganizationDto) {
    return this.organizationRepository.update(id, updateProjectDto);
  }

  remove(id: number) {
    return this.organizationRepository.delete(id);
  }
}
