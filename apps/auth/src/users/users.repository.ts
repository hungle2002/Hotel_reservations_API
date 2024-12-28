import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository, User } from '@app/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class UsersRepository extends AbstractRepository<User> {
  protected readonly logger = new Logger(UsersRepository.name);
  constructor(
    @InjectRepository(User)
    userRespository: Repository<User>,
    userManager: EntityManager,
  ) {
    super(userRespository, userManager);
  }
}
