import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const currentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    return 'hi there';
  },
);
