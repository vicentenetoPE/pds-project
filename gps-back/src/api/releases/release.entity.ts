import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Project } from 'src/api/projects/entities/project.entity';
import { Task } from 'src/api/tasks/entities/task.entity';

@Entity('release')
export class Release {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'timestamp' })
  releaseDate: Date;

  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Project, (project) => project.releases)
  @JoinColumn()
  project: Project;

  @OneToMany(() => Task, (task) => task.release)
  tasks: Task[];
}
