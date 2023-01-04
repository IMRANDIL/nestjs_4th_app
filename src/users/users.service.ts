import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { createUserDTO } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}
  async createUser(email: string, password: string) {
    // const findUser = await this.repo.findOne({email:email});
    const createNewUser = this.repo.create({ email, password });

    return this.repo.save(createNewUser);
  }

  getAllUser() {
    return this.repo.find({});
  }
}
