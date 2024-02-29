import { Injectable, Delete, NotFoundException } from '@nestjs/common';
import { TaskStatus, Task } from './tasks.model';
import { v4 as uuid } from "uuid";
import { CreateTask } from './dto/create.task.dto';
import { GetTaskFilterDto } from './dto/get.tasks.filter.dto';
import { NotFoundError, filter } from 'rxjs';


@Injectable()
export class TasksService {
    private tasks: Task[] = []

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTaskWithFilter(filterDto:GetTaskFilterDto): Task[]{

        const {status,search} = filterDto;
        let tasks = this.getAllTasks();
 
        if(status){
            tasks = tasks.filter((task) => task.status === status);
        }

        if(search){
            tasks= tasks.filter((task) => {
                if(task.title.includes(search) || task.description.includes(search)){
                    return true;
                }
                return false;
            })
        }
        
        return tasks;
    }

    createTask(createTask: CreateTask): Task {
        const { title, description } = createTask;
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        }
        this.tasks.push(task)
        return task;
    }

    getTaskById(id: string): Task | undefined {
        const found = this.tasks.find((task) => task.id === id);
        if(!found){
            throw new NotFoundException(`Task with id ${id} Not found`);
        }

        return found;
    }

    deleteTaskById(id: string): void {
        const found = this.getTaskById(id);
        this.tasks = this.tasks.filter((task) => task.id !== found?.id);
    }

    updateTaskStatus(id: string, status: TaskStatus):Task | undefined {
    const task = this.getTaskById(id);
       if(task){
        task.status = status;
        return task;
       }
    }

}
