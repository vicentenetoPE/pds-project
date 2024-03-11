import { Organization } from "src/api/organizations/entities/organization.entity";
import { Task } from "src/api/tasks/entities/task.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('project')
export class Project {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(type =>Task, task=>task.project)
    tasks:Task[];

    @ManyToOne(()=>Organization, (Organization=>Organization.projects))
        organization:Organization;
    

}
