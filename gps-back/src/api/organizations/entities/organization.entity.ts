import { Project } from "src/api/projects/entities/project.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation } from "typeorm";
import { User } from "src/api/users/user.entity";


@Entity()
export class Organization {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name:string;

    @ManyToOne(()=>User, (User=>User.ownedOrganizations))
    @JoinColumn()
    owner:Relation<User>;

    
    @ManyToMany(()=>User, (User=>User.organizations))
    @JoinTable()
    members: User[];

    @OneToMany(()=>Project, (Project=>Project.organization))
    projects:Relation<Project[]>;
}
