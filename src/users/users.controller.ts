import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Put,
  Delete,
  NotFoundException,
  Session,
} from '@nestjs/common';
import { createUserDTO } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { Serialize } from 'src/Interceptors/serialize.interceptor';
import { UserDTO } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { currentUser } from './decorators/current-user.decorator';
import { User } from './user.entity';

@Serialize(UserDTO)
@Controller('auth')
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Get('/allUser')
  getAllUser() {
    return this.userService.getAllUser();
  }

  // @Get('/Whoami')
  // async whoAmI(@Session() session: any) {
  //   const user = await this.userService.getSpecificUser(session.userId);
  //   if (!user) {
  //     throw new NotFoundException('User not found');
  //   }
  //   return user;
  // }

  @Get('/Whoami')
  async whoAmI(@currentUser() user: User) {
    return user;
  }

  @Post('/signout')
  signOut(@Session() session: any) {
    session.userId = null;
    return 'user signed out';
  }

  @Post('/signup')
  async createUser(@Body() body: createUserDTO, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/signIn')
  async signInUser(@Body() body: createUserDTO, @Session() session: any) {
    const user = await this.authService.signIn(body.email, body.password);
    session.userId = user.id;
    return user;
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
