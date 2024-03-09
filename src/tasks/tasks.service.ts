import { Injectable, NotFoundException } from "@nestjs/common";
import { TaskRepository } from "./task.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/create.task.dto";
import { TaskStatus } from "./tasks.status.enum";
import { GetTaskFilterDto } from "./dto/get.tasks.filter.dto";

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private taskRepository: TaskRepository) {}
  async getTaskById(id: string): Promise<Task> {
    const found = await this.taskRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`Task With id = ${id} Not found !!`);
    }
    return found;
  }

  async getTasks(filterDto:GetTaskFilterDto= {}): Promise<Task[]> {
    const query =  this.taskRepository.createQueryBuilder('task');   
    const tasks=await query.getMany();
    return  tasks;
  }

  async createTask(createTaskDto:CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task =  this.taskRepository.create({
      title,
      description,
      status: TaskStatus.OPEN
    });
    await this.taskRepository.save(task);
    return task;
  }

  async deleteTaskById(id: string): Promise<void> {
    const task = await this.taskRepository.delete(id);
    if (task.affected==0){
      throw new NotFoundException(`Task With id = ${id} Not found !!`)
    }
  }

  async updateTaskStatus(id:string,status:TaskStatus):Promise<Task>{
    const task= await this.getTaskById(id);
    task.status= status;
    await this.taskRepository.save(task)
    return task;
  }

}


