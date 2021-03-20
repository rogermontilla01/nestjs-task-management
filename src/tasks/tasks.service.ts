import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;

    let tasks = this.getAllTasks();
    //Search by status
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    //Search by search parameter
    //.includes resolve true when find a string and then filter takes the json
    if (search) {
      tasks = tasks.filter((task) => task.title.includes(search) || task.description.includes(search));
    }

    return tasks;
  }

  getTaskById(id: string): Task {
    const found = this.tasks.find((task) => task.id === id);
    //Error handling
    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return found;
  }

  deleteTaskById(id: string): Task[] {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    return this.tasks;
  }

  updateTaskEstatusById(id: string, status: TaskStatus): Task {
    let task = this.getTaskById(id);
    task.status = status; //task hold the reference to tasks array
    return task;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuidv4(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task; //return the new task is useful to display it
  }
}
