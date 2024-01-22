import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';

dotenv.config();

export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<any> {
    const req = context.switchToHttp().getRequest();

    try {
      const token = req.headers['authorization']?.split(' ')[1];

      const jwtService = new JwtService();

      const res = jwtService.verify(token, {
        publicKey: process.env.SECRET,
        ignoreNotBefore: true,
      });

      req.user = JSON.parse(res.unique_);

      return true;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException(error?.message);
    }
  }
}
