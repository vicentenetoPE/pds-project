import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('task')
export class Task {

@PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 120 })
  name: string;
}
