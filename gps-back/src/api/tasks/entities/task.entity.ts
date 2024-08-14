import { Project } from 'src/api/projects/entities/project.entity';
import { User } from 'src/api/users/entity/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, OneToMany, ManyToMany } from 'typeorm';

@Entity('task')
export class Task {

@PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 120 })
  name: string;

  @ManyToOne(()=> Project, (Project=>Project.tasks))
  @JoinColumn()
  project: Project;

  @Column({ length: 120 })
  status: string;
  
  @ManyToOne(()=> User, (user=>user.id))
  @JoinColumn()
  createdBy: User;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: string;

  @ManyToMany(()=>User, (user=>{user.id, user.name}))
  colaborators: string;
}
