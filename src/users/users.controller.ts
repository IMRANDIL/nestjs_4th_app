import { Controller, Post, Body, Param, Get, Put } from '@nestjs/common';
import { createUserDTO } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Post('/signup')
  createUser(@Body() body: createUserDTO) {
    return this.userService.createUser(body.email, body.password);
  }

  @Get('/:id')
  findOne(@Param() id: number) {
    return this.userService.findOne(id);
  }

  @Get('/allUser')
  find() {
    return this.userService.find();
  }

  @Put('/:id')
  update(@Param() id: number, @Body() body: any) {
    return this.userService.update(id, body);
  }
}
