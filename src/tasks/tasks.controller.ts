import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreateTaskDto } from "./dto/create.task.dto";
import { UpdateTaskDto } from "./dto/update.task.dto";
import { GetTaskFilterDto } from "./dto/get.tasks.filter.dto";
import { ApiTags } from "@nestjs/swagger";

@Controller('tasks')
@ApiTags('Tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}
  @Get()
  getTasks(filterDto:GetTaskFilterDto): Promise<Task[]> {
    return this.taskService.getTasks(filterDto);
  }
  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.taskService.getTaskById(id);
  }
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDto);
  }
  @Delete('/:id')
  deleteTask(@Param('id') id:string):Promise<void>{
     return this.taskService.deleteTaskById(id)
  }

  @Patch("/:id/status")
  updateTaskStatus(
    @Param('id') id:string ,
    @Body() updateTaskDto:UpdateTaskDto):Promise<Task>{
    const { status } = updateTaskDto;
    return this.taskService.updateTaskStatus(id,status)
  }
}

