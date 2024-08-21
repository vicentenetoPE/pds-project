import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn, JoinTable, ManyToMany } from 'typeorm';
import { Organization } from 'src/api/organizations/entities/organization.entity';
import { Task } from 'src/api/tasks/entities/task.entity';
import { User } from 'src/api/users/entity/user.entity';
import { Sprint } from 'src/api/sprints/sprints.entity';
import { Release } from 'src/api/releases/release.entity';

@Entity('project')
export class Project {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    shortDescription: string;

    @Column({ type: 'timestamp', nullable: true })
    startDate: Date;

    @Column({ type: 'timestamp', nullable: true })
    endDate: Date;

    @Column({default: 'em progresso'})
    status: string;

    @Column('decimal', { precision: 10, scale: 2, nullable: true })
    budget: number;

    @ManyToOne(() => User, (user) => user.ownedProjects)
    @JoinColumn()
    owner: User;

    @OneToMany(() => Task, (task) => task.project)
    tasks: Task[];

    @OneToMany(() => Sprint, (sprint) => sprint.project)
    sprints: Sprint[];

    @OneToMany(() => Release, (release) => release.project)
    releases: Release[];

    @ManyToMany(() => User, (user) => user.projects)
    @JoinTable()
    members: User[];
}
