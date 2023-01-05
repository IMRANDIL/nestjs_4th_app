import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { createUserDTO } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}
  async createUser(email: string, password: string) {
    const findUser = await this.repo.findOneBy({ email: email });
    if (findUser) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'User Already Existed',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: null,
        },
      );
    }
    const createNewUser = this.repo.create({ email, password });

    return this.repo.save(createNewUser);
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  find() {
    return this.repo.find({});
  }

  update() {}

  remove() {}
}
