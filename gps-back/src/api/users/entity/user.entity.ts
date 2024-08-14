import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  Unique
} from 'typeorm';
import { Organization } from '../../organizations/entities/organization.entity';
import { Project } from 'src/api/projects/entities/project.entity';
import { Task } from 'src/api/tasks/entities/task.entity';

type Role = 'admin'|'user';

@Entity('user')
export class User {
  constructor(partial: Partial<User>, role: Role='user') {
    Object.assign(this, partial);
    this.role = role;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  name: string;

  @Column({ length: 120 })
  password: string;

  @Column()
  role: Role;

  @Column({ length: 120, unique: true })
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Organization, (Organization) => Organization.owner)
  ownedOrganizations: Organization[];

  @OneToMany(() => Task, (task) => task.createdBy)
  createdTasks: Task[];

  @ManyToMany(() => Organization, (Organization) => Organization.members)
  organizations: Organization[];

  @OneToMany(() => Project, (project) => project.owner)
  projects: Project[]
}



