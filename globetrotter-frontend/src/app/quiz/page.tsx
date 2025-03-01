import Quiz from '@/components/Quiz';
import { QuizService } from '@/services/quiz.service';
import React from 'react';

export const dynamic = 'force-dynamic';

export default async function QuestionPage() {
  const quizQuestion = await QuizService.get();
  return <Quiz quizQuestion={quizQuestion} key={quizQuestion.alias} />;
}
