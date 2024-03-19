import { Project } from 'src/api/projects/entities/project.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('task')
export class Task {

@PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 120 })
  name: string;

  @ManyToOne(()=> Project, (Project=>Project.tasks))
  @JoinColumn()
  project: Project;
}
