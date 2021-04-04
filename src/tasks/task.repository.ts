import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { TaskEntity } from './task.entity';

@EntityRepository(TaskEntity)
export class TaskRepository extends Repository<TaskEntity> {
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
