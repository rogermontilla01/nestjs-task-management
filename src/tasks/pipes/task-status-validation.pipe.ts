import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../task-status.enum';

//How to create a custom pipe
export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [TaskStatus.OPEN, TaskStatus.DONE, TaskStatus.IN_PROGRESS];

  //transform() is the method called by nestjs to process the argument
  //it accepts two parameters value and metadata(optional)
  transform(value: any) {
    value = value.toUpperCase();
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`"${value}" is an invalid status`);
    }
    return value;
  }

  private isStatusValid(status: any) {
    const idx = this.allowedStatuses.indexOf(status);
    return idx !== -1;
  }
}
