import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Organization } from 'src/api/organizations/entities/organization.entity';
import { Project } from 'src/api/projects/entities/project.entity';
import { Task } from 'src/api/tasks/entities/task.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  name: string;

  @Column({ length: 120, unique: true })
  email: string;

  @Column({ length: 120 })
  password: string;

  @Column({ length: 20 })
  role: string;  // e.g., 'admin' | 'user'

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Organization, (organization) => organization.owner)
  ownedOrganizations: Organization[];

  @ManyToMany(() => Organization, (organization) => organization.members)
  @JoinTable()
  organizations: Organization[];

  @OneToMany(() => Project, (project) => project.owner)
  ownedProjects: Project[];

  @OneToMany(() => Task, (task) => task.createdBy)
  createdTasks: Task[];

  @ManyToMany(() => Task, (task) => task.assignees)
  @JoinTable()
  assignedTasks: Task[];
}
