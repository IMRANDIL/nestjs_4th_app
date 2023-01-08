import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { BadRequestException } from '@nestjs/common';

describe('AuthService in Action', () => {
  let service: AuthService;

  beforeEach(async () => {
    //create a fake copy of users service

    const fakeUsersService: Partial<UsersService> = {
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
    const user = await service.signup('raju@gmail.com', '2580123');
    expect(user.password).not.toEqual('2580123');
    const [hash, salt] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });
});
