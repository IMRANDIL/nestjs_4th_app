import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Put,
  Delete,
} from '@nestjs/common';
import { createUserDTO } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Post('/signup')
  createUser(@Body() body: createUserDTO) {
    return this.userService.createUser(body.email, body.password);
  }

  @Get('/allUser')
  getAllUser() {
    return this.userService.getAllUser();
  }

  @Get('/:id')
  findOne(@Param() id: string) {
    return this.userService.findOne(parseInt(id));
  }

  @Put('/:id')
  update(@Param() id: string, @Body() body: any) {
    return this.userService.update(parseInt(id), body);
  }

  @Delete('/:id')
  delete(@Param() id: string) {
    return this.userService.remove(parseInt(id));
  }
}
