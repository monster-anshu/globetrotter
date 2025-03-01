import { Question, QuestionModelProvider } from '@/mongo/question.schema';
import { getRandomValueFromArray, shuffleArray } from '@/utils/array';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { QuizCheckDto } from './dto/quiz-check.dto';

@Injectable()
export class QuizService {
  constructor(
    @Inject(QuestionModelProvider.provide)
    private readonly questionModel: typeof QuestionModelProvider.useValue
  ) {}

  async get() {
    const randomDestinations = await this.questionModel.aggregate<
      Question & { _id: Types.ObjectId }
    >([
      { $sample: { size: 1 } },
      {
        $project: {
          clues: 1,
          alias: 1,
          name: 1,
        },
      },
    ]);

    const randomDestination = randomDestinations[0];

    if (!randomDestination) return null;

    const alternativeOptions = await this.questionModel.aggregate<
      Question & { _id: Types.ObjectId }
    >([
      { $match: { name: { $ne: randomDestination.name } } },
      {
        $group: {
          _id: '$name',
          questionId: { $first: '$_id' },
          count: { $sum: 1 },
        },
      },
      { $sample: { size: 3 } },
      { $project: { _id: '$questionId', name: '$_id' } },
    ]);

    const options = alternativeOptions
      .map((question) => ({
        name: question.name,
        id: question._id,
      }))
      .concat({
        name: randomDestination.name,
        id: randomDestination._id,
      });

    const randomClue = getRandomValueFromArray(randomDestination.clues);

    return {
      alias: randomDestination.alias,
      clue: randomClue,
      options: shuffleArray(options),
    };
  }

  async check({ alias, answer }: QuizCheckDto) {
    const question = await this.questionModel
      .findOne({
        alias: alias,
      })
      .lean();

    if (!question) {
      throw new NotFoundException('Question not found');
    }

    if (answer !== question.name) {
      return false;
    }

    return true;
  }
}
