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
import { UpdateUserDTO } from './dtos/update-user.dto';

@Controller('auth')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get('/allUser')
  getAllUser() {
    return this.userService.getAllUser();
  }

  @Post('/signup')
  createUser(@Body() body: createUserDTO) {
    return this.userService.createUser(body.email, body.password);
  }

  @Get('/:id')
  getSpecificUser(@Param() Param: any) {
    return this.userService.getSpecificUser(parseInt(Param.id));
  }

  @Put('/:id')
  update(@Param() param: any, @Body() body: UpdateUserDTO) {
    return this.userService.update(parseInt(param.id), body);
  }

  @Delete('/:id')
  delete(@Param() param: any) {
    return this.userService.remove(parseInt(param.id));
  }
}
