import { Controller, Post, Body, Param } from '@nestjs/common';

@Controller('auth')
export class UsersController {
  @Post('/signup')
  createUser() {}
}
