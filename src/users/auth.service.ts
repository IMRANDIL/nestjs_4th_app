import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);
@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}
  async signup(email: string, password: string) {
    const user = await this.usersService.findUser(email);
    if (user) {
      throw new BadRequestException('User already Exist');
    }

    //generate the salt..
    const salt = randomBytes(8).toString('hex');

    //add hashed password
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    //join hash and salt

    const result = hash.toString('hex') + '.' + salt;

    // create a new user..

    const newUser = await this.usersService.createUser(email, result);

    return newUser;
  }
}
