import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { TokenPayload } from './interfaces/token-payload.interface';
import { User } from '@app/common';

@Injectable()
export class AuthService {
  constructor(
    /**
     * Injecting the configService
     */
    private readonly configService: ConfigService,
    /**
     * Injecting the jwtService
     */
    private readonly jwtService: JwtService,
  ) {}

  async login(user: User, response: Response) {
    const tokenPayload: TokenPayload = {
      userId: user._id.toHexString(),
    };

    const expire = new Date();
    expire.setSeconds(
      expire.getSeconds() + this.configService.get('JWT_EXPIRATION'),
    );

    const token = this.jwtService.sign(tokenPayload);

    response.cookie('Authentication', token, {
      httpOnly: true,
      expires: expire,
    });
  }
}
