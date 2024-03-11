import { Inject, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}

    async create(user: User): Promise<User> {
        return this.userRepository.save(user);
    }

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findOne(username: string): Promise<User | undefined> {
        const users = await this.userRepository.find();
        const response = users.find(user => user.name === username);
        return response
    }

    async delete(id:number){
        return this.userRepository.delete(id);
    }

    async update(id:number, user:User){
        return this.userRepository.update(id, user)
    }

}