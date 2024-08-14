import { Organization } from "src/api/organizations/entities/organization.entity";
import { Task } from "src/api/tasks/entities/task.entity";
import { User } from "src/api/users/entity/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('project')
export class Project {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    shortDescription: string;

    @OneToMany(() =>Task, task=>task.project)
    tasks:Task[];

    @ManyToOne(()=>Organization, (Organization=>Organization.projects))
    @JoinColumn()
    organization:Organization;
    
    @ManyToOne(()=>User, (User=>User.projects))
    @JoinColumn()
    owner:User;

}
