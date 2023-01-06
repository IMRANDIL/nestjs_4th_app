import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}
  async createUser(email: string, password: string) {
    const createNewUser = this.repo.create({ email, password });

    return this.repo.save(createNewUser);
  }

  async findUser(email: string) {
    const user = await this.repo.findOneBy({ email });
    return user;
  }

  async getSpecificUser(id: number) {
    try {
      const user = await this.repo.findOneBy({ id });
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllUser() {
    try {
      const users = await this.repo.find();
      return users;
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.getSpecificUser(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    Object.assign(user, attrs);

    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.getSpecificUser(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.repo.remove(user);
  }
}
