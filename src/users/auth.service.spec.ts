import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UsersService } from './users.service';

describe('AuthService in Action', () => {
  let service: AuthService;

  beforeEach(async () => {
    //create a fake copy of users service

    const fakeUsersService: Partial<UsersService> = {
      findUser: (email: string) =>
        Promise.resolve({ id: 1, email, password: '2580123' } as User),
      createUser: (email: string, password: string) =>
        Promise.resolve({ id: 1, email, password } as User),
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
});
