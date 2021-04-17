import { InternalServerErrorException, Logger } from '@nestjs/common';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { TaskEntity } from './task.entity';

@EntityRepository(TaskEntity)
export class TaskRepository extends Repository<TaskEntity> {
  private logger = new Logger('TaskRepository');

  /* get all tasks using createQueryBuilder */
  async getTasks(filterDto: GetTasksFilterDto, @GetUser() user: User): Promise<TaskEntity[]> {
    const { status, search } = filterDto;
    /* the 'task' argument is an alias to refer the task entity inside queries */
    /* on the other hand, .createQueryBuilder is a method witch comes from Repository<TaskEntity> */

    const query = this.createQueryBuilder('task'); //create a variable witch contain the query builder

    /*Search taks by ID */
    query.where('task.userId = :userId', { userId: user.id });

    /* We use .andWhere because we need to include both arguments in our search */
    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      /* we use `%${search}%` because we gonna make a partial search "look at typeorm docs"*/
      query.andWhere('task.title LIKE :search OR task.description LIKE :search', { search: `%${search}%` });
    }

    try {
      const tasks = await query.getMany();
      return tasks;
    } catch (err) {
      this.logger.error(
        `Failed to get tasks for user "${user.username}", DTO: ${JSON.stringify(filterDto)}`,
        err.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  /* Method used to create a new task */
  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<TaskEntity> {
    //argument destructuring
    const { title, description } = createTaskDto;

    const task = new TaskEntity();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    task.user = user;

    try {
      await task.save();
    } catch (err) {
      this.logger.error(`Failed to create a task for user "${user.username}". Data: ${createTaskDto}`, err.stack);
      throw new InternalServerErrorException();
    }

    delete task.user;

    return task;
  }
}
