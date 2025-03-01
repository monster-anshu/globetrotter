import { Body, Controller, Get, Post } from '@nestjs/common';
import { QuizCheckDto } from './dto/quiz-check.dto';
import { QuizService } from './quiz.service';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get()
  async get() {
    const question = await this.quizService.get();
    return {
      question,
    };
  }

  @Post('check')
  async check(@Body() body: QuizCheckDto) {
    const match = await this.quizService.check(body);
    return { match };
  }
}
