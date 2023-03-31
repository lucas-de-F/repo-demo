import { Injectable } from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common/interfaces';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { shouldBypassAuth } from '../rolesDecorator';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {
    super();
  }
  private extractJwtFromRequest(request: any): string | null {
    if (request.headers.authorization?.startsWith('Bearer ')) {
      return request.headers.authorization.split(' ')[1];
    }
    if (request.cookies?.token) {
      return request.cookies.token;
    }
    return null;
  }
  async canActivate(context: ExecutionContext) {
    if (shouldBypassAuth(context, this.reflector)) return true;
    const request = context.switchToHttp().getRequest();
    const token = this.extractJwtFromRequest(request);

    if (!token) {
      return false;
    }

    try {
      const decoded = await this.jwtService.verifyAsync(token, {
        secret: process.env['JWT_SECRET'],
      });
      request.user = decoded;
      return true;
    } catch (error) {
      return false;
    }
  }

  handleRequest<TUser = any>(err: any, user: any): TUser {
    return user;
  }
}
