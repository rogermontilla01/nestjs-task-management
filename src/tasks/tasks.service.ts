import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { TaskEntity } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
  /* Inject the repository that we will using on the next methods */
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  /* Get task by ID */
  async getTaskById(id: number): Promise<TaskEntity> {
    const found = await this.taskRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return found;
  }

  /* Delete task by ID */
  async deleteTaskById(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" does not exist`);
    }
  }

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

  async updateTaskEstatusById(id: number, status: TaskStatus): Promise<TaskEntity> {
    const task = await this.getTaskById(id);
    /* just update the task object */
    task.status = status;
    await task.save();
    return task;
  }
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
