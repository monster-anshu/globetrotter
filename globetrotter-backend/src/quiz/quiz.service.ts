import { QuestionModelProvider } from '@/mongo/question.schema';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class QuizService {
  constructor(
    @Inject(QuestionModelProvider.provide)
    private readonly questionModel: typeof QuestionModelProvider.useValue
  ) {}
}
