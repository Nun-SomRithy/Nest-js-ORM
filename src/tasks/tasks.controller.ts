import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.model';
import { CreateTask } from './dto/create.task.dto';
import { GetTaskFilterDto } from './dto/get.tasks.filter.dto';
import { UpdateTaskDto } from './dto/update.task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private TasksService: TasksService) { }

    @Get()
    getTasks(@Query() filterDto:GetTaskFilterDto): Task[]{
        if(Object.keys(filterDto).length){
            return this.TasksService.getTaskWithFilter(filterDto)

        }else{
            return this.TasksService.getAllTasks();
        }
    }

    @Get('/:id')
    getTaskById(@Param('id') id:string): Task | undefined {
        return this.TasksService.getTaskById(id);
    }

    @Post() 
    createTask(@Body() createTask: CreateTask): Task {
        return this.TasksService.createTask(createTask);
    }

    @Delete('/:id')
    deleteById(@Param('id') id:string ): void {
        return this.TasksService.deleteTaskById(id)
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id:string ,
        @Body() updateTaskStatusDto:UpdateTaskDto): Task | undefined {
        const {status} = updateTaskStatusDto
        return this.TasksService.updateTaskStatus(id,status)
    }


}
