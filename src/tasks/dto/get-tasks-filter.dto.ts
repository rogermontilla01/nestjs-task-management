import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

/* This class is used to filter parameters that we got in a search */
export class GetTasksFilterDto {
  @IsOptional()
  @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
  @ApiProperty()
  status: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  @ApiProperty()
  search: string;
}
