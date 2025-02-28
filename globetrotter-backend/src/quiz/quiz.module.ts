import { QuestionModelProvider } from '@/mongo/question.schema';
import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';

@Module({
  providers: [QuizService, QuestionModelProvider],
  controllers: [QuizController],
})
export class QuizModule {}
