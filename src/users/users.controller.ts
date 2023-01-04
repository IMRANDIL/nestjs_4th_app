import { Controller, Post, Body, Param } from '@nestjs/common';
import { createUserDTO } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Post('/signup')
  createUser(@Body() body: createUserDTO) {
    return this.userService.createUser(body);
  }
}
