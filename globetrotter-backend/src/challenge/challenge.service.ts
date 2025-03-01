import { UserModelProvider } from '@/mongo/user.schema';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ChallengeService {
  constructor(
    @Inject(UserModelProvider.provide)
    private readonly userModel: typeof UserModelProvider.useValue
  ) {}

  async get(challengeId: string) {
    const user = await this.userModel
      .findOne({
        status: 'ACTIVE',
        _id: challengeId,
      })
      .lean();

    if (!user?.username) {
      throw new NotFoundException('CHALLENGE_NOT_FOUND');
    }

    return {
      score: user.score,
      username: user.username,
    };
  }
}
