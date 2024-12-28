import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../dto';

const getCurrentUserByContext = (context: ExecutionContext): User =>
  context.switchToHttp().getRequest().user;

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
