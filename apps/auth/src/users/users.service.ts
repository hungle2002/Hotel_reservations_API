import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UsersRepository } from './users.repository';
import { CreateUser } from './dto/create-user.dto';
import { GetUser } from './dto/get-user.dto';
import { User } from '@app/common';

@Injectable()
export class UsersService {
  constructor(
    /**
     * Inject the UsersRepository
     */
    private readonly usersRepository: UsersRepository,
  ) {}
  async create(createUser: CreateUser) {
    await this.validateCreateUser(createUser);
    const user = new User({
      ...createUser,
      password: await bcrypt.hash(createUser.password, 10),
    });
    return this.usersRepository.create(user);
  }

  private async validateCreateUser(createUser: CreateUser) {
    try {
      await this.usersRepository.findOne({
        email: createUser.email,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return;
    }
    throw new UnprocessableEntityException('Email already existed!');
  }

  async verifyUser(email: string, password: string): Promise<User> {
    const user = await this.usersRepository.findOne({ email });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  async getUser(getUser: GetUser) {
    return this.usersRepository.findOne(getUser);
  }
}
