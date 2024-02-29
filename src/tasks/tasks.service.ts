import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';


@Injectable()
export class TasksService {

    constructor(@InjectRepository(TaskRepository) private taskRepository:TaskRepository){}

    async getTaskById(id:any):Promise<Task>{
        const found = await this.taskRepository.findOne(id);
        
        if (!found){
            throw new NotFoundException(`Task With id = ${id} Not found !!`)
        }
        return found;  
    }


}
