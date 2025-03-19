import {
  CanActivate,
  ExecutionContext,
  // HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    let token = request.headers['authorization'];

    if (!token) {
      throw new UnauthorizedException('need auth');
    }

    try {
      const userData = await jwt.verify(token, process.env.JWT_KEY);

      request.headers['user_data'] = userData;

      return true;
    } catch (error) {
      throw new UnauthorizedException('unauthorized - ' + 'jwt not provided');
    }
  }
}
