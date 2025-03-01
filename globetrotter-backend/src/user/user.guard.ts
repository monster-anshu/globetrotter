import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import type { Request } from 'express';
import { UserService } from './user.service';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const session = request.session;

    if (!session) {
      return false;
    }

    const user = await this.userService.getById(session.userId);

    if (!user) {
      return false;
    }

    return true;
  }
}
