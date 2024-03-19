import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany } from 'typeorm';
import { Organization } from '../organizations/entities/organization.entity';
import { IsEmail, IsNotEmpty } from 'class-validator';


@Entity('user')
export class User {
  
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column({ length: 500 })
  password: string;


  @Column({ length: 120, unique:true })
  @IsEmail()
  email: string;

  @OneToMany(()=>Organization, (Organization=> Organization.owner))
  ownedOrganizations:Organization[];

  @ManyToMany(()=>Organization, (Organization=>Organization.members))
  organizations:Organization[];

  //todo add role
}