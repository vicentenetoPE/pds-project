import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinColumn, JoinTable, CreateDateColumn } from 'typeorm';
import { Project } from 'src/api/projects/entities/project.entity';
import { User } from 'src/api/users/entity/user.entity';
import { Sprint } from 'src/api/sprints/sprints.entity';
import { Release } from 'src/api/releases/release.entity';


@Entity('task')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 120 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column('enum', { enum: ['backlog', 'ready', 'doing','review', 'done'], default: 'backlog' })
  status: string;

  @Column({ type: 'int', nullable: true })
  priority: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  estimatedTime: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  loggedTime: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ManyToOne(() => Project, (project) => project.tasks)
  @JoinColumn()
  project: Project;

  @ManyToOne(() => User, (user) => user.assignedTasks)
  @JoinColumn()
  createdBy: User;

  @ManyToMany(() => User, (user) => user.assignedTasks)
  @JoinTable()
  assignees: User[];

  @ManyToOne(() => Sprint, (sprint) => sprint.tasks, { nullable: true })
  @JoinColumn()
  sprint: Sprint;

  @ManyToOne(() => Release, (release) => release.tasks, { nullable: true })
  @JoinColumn()
  release: Release;
}
