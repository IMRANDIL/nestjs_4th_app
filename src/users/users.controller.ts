import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Put,
  Delete,
  NotFoundException,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { createUserDTO } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDTO } from './dtos/update-user.dto';

@Controller('auth')
export class UsersController {
  constructor(private userService: UsersService) {}
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/allUser')
  getAllUser() {
    return this.userService.getAllUser();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/signup')
  createUser(@Body() body: createUserDTO) {
    return this.userService.createUser(body.email, body.password);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/:id')
  async getSpecificUser(@Param('id') id: string) {
    const specificUser = await this.userService.getSpecificUser(parseInt(id));
    if (!specificUser) {
      throw new NotFoundException('User not found');
    }
    return specificUser;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put('/:id')
  update(@Param('id') id: string, @Body() body: UpdateUserDTO) {
    return this.userService.update(parseInt(id), body);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.userService.remove(parseInt(id));
  }
}
