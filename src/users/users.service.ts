import { Injectable, Param } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: '123456',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(@Param('username') username: string) {
    return this.users.find((user) => user.username === username);
  }
}
