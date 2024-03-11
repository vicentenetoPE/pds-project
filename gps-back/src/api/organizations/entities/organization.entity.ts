import { Project } from "src/api/projects/entities/project.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class Organization {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name:string;

    @OneToMany(()=>Project, (Project=>Project.organization))
    projects:Project[];
}
