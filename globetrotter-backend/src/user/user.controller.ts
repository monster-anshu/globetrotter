import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserCreateDto } from './dto/user-create.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(
    @Body() body: UserCreateDto,
    @Req() req: Request,
    @Res() res: Response
  ) {
    const oldUserId = req.session?.userId;

    const { token } = await this.userService.create(body, oldUserId);

    res.cookie('__session', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      path: '/',
    });

    res.json({ isSuccess: true });
  }
}
