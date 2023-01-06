import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CurrentUserInterceptor } from './interceptos/current-user.interceptor';

@Module({
  controllers: [UsersController],
  providers: [UsersService, AuthService, CurrentUserInterceptor],
  imports: [TypeOrmModule.forFeature([User])],
})
export class UsersModule {}
