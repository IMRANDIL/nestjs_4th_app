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
} from '@nestjs/common';
import { createUserDTO } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { Serialize } from 'src/Interceptors/serialize.interceptor';
import { UserDTO } from './dtos/user.dto';

@Serialize(UserDTO)
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
  async getSpecificUser(@Param('id') id: string) {
    const specificUser = await this.userService.getSpecificUser(parseInt(id));
    if (!specificUser) {
      throw new NotFoundException('User not found');
    }
    return specificUser;
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() body: UpdateUserDTO) {
    return this.userService.update(parseInt(id), body);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.userService.remove(parseInt(id));
  }
}
