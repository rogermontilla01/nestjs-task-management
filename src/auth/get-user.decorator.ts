import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './user.entity';

//custon decorator
//see https://docs.nestjs.com/custom-decorators
export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return user;
  },
);
