import { Controller, Post, Body, Param } from '@nestjs/common';
import { createUserDTO } from './dtos/create-user.dto';

@Controller('auth')
export class UsersController {
  @Post('/signup')
  createUser(@Body() body: createUserDTO) {}
}
