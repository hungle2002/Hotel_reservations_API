import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    /**
     * Inject the UsersRepository
     */
    private readonly usersRepository: UsersRepository,
  ) {}
  async create(createUserDto: any) {
    return this.usersRepository.create(createUserDto);
  }
}
