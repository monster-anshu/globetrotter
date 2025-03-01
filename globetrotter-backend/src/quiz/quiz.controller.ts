import { GetSession } from '@/session/session.decorator';
import { UserGuard } from '@/user/user.guard';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { QuizCheckDto } from './dto/quiz-check.dto';
import { QuizService } from './quiz.service';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get()
  async get() {
    const question = await this.quizService.get();
    return {
      isSuccess: true,
      question,
    };
  }

  @UseGuards(UserGuard)
  @Post('check')
  async check(
    @GetSession('userId') userId: string,
    @Body() body: QuizCheckDto
  ) {
    const match = await this.quizService.check(userId, body);
    return {
      isSuccess: true,
      match,
    };
  }
}
