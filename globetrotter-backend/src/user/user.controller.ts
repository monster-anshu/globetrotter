import { GetSession } from '@/session/session.decorator';
import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserCreateDto } from './dto/user-create.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async info(@GetSession('userId') userId: string) {
    const user = await this.userService.getById(userId);
    return {
      isSuccess: true,
      user: user,
    };
  }

  @Post()
  async create(
    @Body() body: UserCreateDto,
    @Res() res: Response,
    @GetSession('userId') oldUserId?: string
  ) {
    const { token, user } = await this.userService.create(body, oldUserId);

    res.cookie('__session', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      path: '/',
    });

    res.json({ isSuccess: true, user });
  }
}
