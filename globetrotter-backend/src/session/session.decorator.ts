import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { Session } from './type';

export const GetSession = createParamDecorator(
  (key: keyof Session, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return request.session?.[key];
  }
);
