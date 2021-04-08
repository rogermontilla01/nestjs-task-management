import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { TaskEntity } from './task.entity';

@EntityRepository(TaskEntity)
export class TaskRepository extends Repository<TaskEntity> {
  /* get all tasks using createQueryBuilder */
  async getTasks(filterDto: GetTasksFilterDto): Promise<TaskEntity[]> {
    const { status, search } = filterDto;
    /* the 'task' argument is an alias to refer the task entity inside queries */
    /* on the other hand, .createQueryBuilder is a method witch comes from Repository<TaskEntity> */

    const query = this.createQueryBuilder('task'); //create a variable witch contain the query builder

    /* We use .andWhere because we need to include both arguments in our search */
    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      /* we use `%${search}%` because we gonna make a partial search "look at typeorm docs"*/
      query.andWhere('task.title LIKE :search OR task.description LIKE :search', { search: `%${search}%` });
    }

    const tasks = await query.getMany();
    return tasks;
  }

  /* Method used to create a new task */
  async createTask(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    //argument destructuring
    const { title, description } = createTaskDto;

    const task = new TaskEntity();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    await task.save();

    return task;
  }
}
