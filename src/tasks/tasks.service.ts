import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
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
  async getTaskById(id: number, user: User): Promise<TaskEntity> {
    const found = await this.taskRepository.findOne({ where: { id, userId: user.id } });
    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return found;
  }

  /* Delete task by ID */
  async deleteTaskById(id: number, user: User): Promise<void> {
    const result = await this.taskRepository.delete({ id, userId: user.id });
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" does not exist`);
    }
  }

  /* Get all task */
  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<TaskEntity[]> {
    return this.taskRepository.getTasks(filterDto, user);
  }

  async updateTaskEstatusById(id: number, status: TaskStatus, user: User): Promise<TaskEntity> {
    const task = await this.getTaskById(id, user);
    /* just update the task object */
    task.status = status;
    await task.save();
    return task;
  }

  //Create new task
  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<TaskEntity> {
    return this.taskRepository.createTask(createTaskDto, user);
  }
}
