import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UsersService } from './users.service';

it('can create an instance of auth service', async () => {
  //create a fake copy of users service

  const fakeUsersService: Partial<UsersService> = {
    findUser: (email: string) =>
      Promise.resolve({ id: 1, email, password } as User),
    createUser: (email: string, password: string) =>
      Promise.resolve({ id: 1, email, password } as User),
  };

  const module = await Test.createTestingModule({
    providers: [AuthService],
  }).compile();

  const service = module.get(AuthService);

  expect(service).toBeDefined();
});
