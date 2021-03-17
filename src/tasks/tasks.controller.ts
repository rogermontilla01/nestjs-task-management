import { Body, Controller, Get, Post } from '@nestjs/common';
import { Task } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  /* Firt way */
  @Post()
  createTask(@Body() body: Task): Task {
    return this.tasksService.createTask(body.title, body.description);
  }
  /* Second way */
  /* @Post() */
  /* createTask(@Body('title') title: string, @Body('description') description: string) { */
  /*   console.log('title:', title); */
  /*   console.log('description:', description); */
  /* } */
}
