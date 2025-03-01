import { QuizService } from '@/services/quiz.service';
import { queryOptions } from '@tanstack/react-query';

export const quizQuery = queryOptions({
  queryKey: ['quiz'],
  queryFn: QuizService.get,
});
