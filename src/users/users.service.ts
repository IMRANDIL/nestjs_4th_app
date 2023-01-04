import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  async createUser(body) {
    console.log(body);
  }
}
