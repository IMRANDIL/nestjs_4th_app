import {
  NestInterceptor,
  CallHandler,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UsersService } from '../users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private usersService: UsersService) {}
  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session || {};
    if (userId) {
      const user = await this.usersService.getSpecificUser(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      request.currentUser = user;
    }

    return next.handle();
  }
}
