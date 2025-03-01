import { UserGuard } from '@/user/user.guard';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { QuizCheckDto } from './dto/quiz-check.dto';
import { QuizService } from './quiz.service';

@UseGuards(UserGuard)
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

  @Post('check')
  async check(@Body() body: QuizCheckDto) {
    const match = await this.quizService.check(body);
    return {
      isSuccess: true,
      match,
    };
  }
}
