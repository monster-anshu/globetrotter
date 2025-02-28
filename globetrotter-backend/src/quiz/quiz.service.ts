import { Question, QuestionModelProvider } from '@/mongo/question.schema';
import { getRandomValueFromArray, shuffleArray } from '@/utils/array';
import { Inject, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';

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

    const randomDestination = randomDestinations.at(0);

    if (!randomDestination) return null;

    const alternativeOptions = await this.questionModel.aggregate<
      Question & { _id: Types.ObjectId }
    >([
      { $match: { name: { $ne: randomDestination.name } } },
      { $sample: { size: 3 } },
      { $project: { name: 1 } },
    ]);

    const options = alternativeOptions
      .map((question) => ({ name: question.name, id: question._id }))
      .concat({ name: randomDestination.name, id: randomDestination._id });

    const question = {
      alias: randomDestination.alias,
      clue: getRandomValueFromArray(randomDestination.clues),
      options: shuffleArray(options),
    };

    return question;
  }
}
