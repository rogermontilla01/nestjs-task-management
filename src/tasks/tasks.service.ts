import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskEntity } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
  //Inject the repository that we will using on the next methods
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  /* getAllTasks(): Task[] { */
  /*   return this.tasks; */
  /* } */
  /* getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] { */
  /*   const { status, search } = filterDto; */
  /*   let tasks = this.getAllTasks(); */
  /*   //Search by status */
  /*   if (status) { */
  /*     tasks = tasks.filter((task) => task.status === status); */
  /*   } */
  /*   //Search by search parameter */
  /*   //.includes resolve true when find a string and then filter takes the json */
  /*   if (search) { */
  /*     tasks = tasks.filter((task) => task.title.includes(search) || task.description.includes(search)); */
  /*   } */
  /*   return tasks; */
  /* } */

  //Get task by ID
  async getTaskById(id: number): Promise<TaskEntity> {
    const found = await this.taskRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return found;
  }

  /* deleteTaskById(id: string): Task[] { */
  /*   const found = this.getTaskById(id); */
  /*   this.tasks = this.tasks.filter((task) => task.id !== found.id); */
  /*   return this.tasks; */
  /* } */
  /* updateTaskEstatusById(id: string, status: TaskStatus): Task { */
  /*   let task = this.getTaskById(id); */
  /*   task.status = status; //task hold the reference to tasks array */
  /*   return task; */
  /* } */

  //Create new task
  async createTask(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    return this.taskRepository.createTask(createTaskDto);
  }
}
