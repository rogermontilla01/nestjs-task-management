import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): Task[] {
    return this.tasksService.deleteTaskById(id);
  }

  @Patch('/status/:id')
  updateTaskEstatusById(@Param('id') id: string, @Body('status') status: Task['status']): Task {
    return this.tasksService.updateTaskEstatusById(id, status);
  }

  /* Firt way */
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }
  /* Second way */
  /* @Post() */
  /* createTask(@Body('title') title: string, @Body('description') description: string) { */
  /*   console.log('title:', title); */
  /*   console.log('description:', description); */
  /* } */
}
