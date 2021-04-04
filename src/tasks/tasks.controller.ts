import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskStatus } from './task-status.enum';
import { TaskEntity } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  /* @Get() */
  /* getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] { */
  /*   if (Object.keys(filterDto).length) { */
  /*     return this.tasksService.getTasksWithFilters(filterDto); */
  /*   } else { */
  /*     return this.tasksService.getAllTasks(); */
  /*   } */
  /* } */

  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<TaskEntity> {
    return this.tasksService.getTaskById(id);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.tasksService.deleteTaskById(id);
  }

  @Patch('/status/:id')
  updateTaskEstatusById(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ): Promise<TaskEntity> {
    return this.tasksService.updateTaskEstatusById(id, status);
  }

  /* Firt way */
  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    return this.tasksService.createTask(createTaskDto);
  }

  /* /1* Second way *1/ */
  /* @Post() */
  /* createTask(@Body('title') title: string, @Body('description') description: string) { */
  /*   console.log('title:', title); */
  /*   console.log('description:', description); */
  /* } */
}
