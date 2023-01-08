import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AuthService in Action', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    //create a fake copy of users service

    fakeUsersService = {
      findUser: (email: string) =>
        Promise.resolve({ id: 1, email, password: '2580123' } as User),
      createUser: (email: string, password: string) =>
        Promise.resolve({ id: 2, email, password } as User),
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: fakeUsersService },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('throws an error if user signs up with email that is in use', async () => {
    await expect(service.signup('ali@gmail.com', '2580123')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('creates a new user with a salted and hashed password', async () => {
    fakeUsersService.findUser = (email: string) => Promise.resolve(null);
    const user = await service.signup('raju@gmail.com', '2580123');
    expect(user.password).not.toEqual('2580123');
    const [hash, salt] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('login check if user does not exist', async () => {
    fakeUsersService.findUser = (email: string) => Promise.resolve(null);
    await expect(service.signIn('love@gmail.com', '2580123')).rejects.toThrow(
      NotFoundException,
    );
  });

  it('login flow password check', async () => {
    fakeUsersService.findUser = () =>
      Promise.resolve({
        email: 'ali@gmail.com',
        password: '258llllllllllllll.0123',
      } as User);
    await expect(service.signIn('ali@gmail.com', 'password')).rejects.toThrow(
      BadRequestException,
    );
  });
});
