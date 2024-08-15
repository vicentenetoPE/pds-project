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
  
  @Entity('sprint')
  export class Sprint {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column({ type: 'timestamp' })
    startDate: Date;
  
    @Column({ type: 'timestamp' })
    endDate: Date;
  
    @Column({ type: 'text', nullable: true })
    goal: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @ManyToOne(() => Project, (project) => project.sprints)
    @JoinColumn()
    project: Project;
  
    @OneToMany(() => Task, (task) => task.sprint)
    tasks: Task[];
  }
  