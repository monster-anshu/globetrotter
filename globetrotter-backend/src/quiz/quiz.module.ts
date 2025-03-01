import { QuestionModelProvider } from '@/mongo/question.schema';
import { Module } from '@nestjs/common';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';

@Module({
  providers: [QuizService, QuestionModelProvider],
  controllers: [QuizController],
})
export class QuizModule {}
