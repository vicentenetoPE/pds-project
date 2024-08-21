import { Project } from "src/api/projects/entities/project.entity";
import { User } from "src/api/users/entity/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation } from "typeorm";


@Entity()
export class Organization {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name:string;

    // @ManyToOne(()=>User, (User=>User.ownedOrganizations))
    // @JoinColumn()
    // owner:Relation<User>;

    
    // @ManyToMany(()=>User, (User=>User.organizations))
    // @JoinTable()
    // members: User[];
}
