import { client } from './client';

export class QuizService {
  static async get() {
    const { data } = await client.get<GetQuizResponse>('/quiz');
    return data.question;
  }

  static async check(body: CheckQuizRequest) {
    const { data } = await client.post<CheckQuizResponse>('/quiz/check', body);
    return data;
  }
}

type GetQuizResponse = {
  question: QuizQuestion;
};

export type QuizQuestion = {
  alias: string;
  clue: string;
  options: Option[];
};

type CheckQuizRequest = {
  alias: string;
  answer: string;
};

type CheckQuizResponse = {
  isSuccess: boolean;
  isCorrect: boolean;
  funFact: string;
  answer: string;
};

type Option = {
  name: string;
  id: string;
};
