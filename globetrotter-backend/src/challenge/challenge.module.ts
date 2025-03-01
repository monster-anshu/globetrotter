import { UserModelProvider } from '@/mongo/user.schema';
import { Module } from '@nestjs/common';
import { ChallengeController } from './challenge.controller';
import { ChallengeService } from './challenge.service';

@Module({
  controllers: [ChallengeController],
  providers: [ChallengeService, UserModelProvider],
})
export class ChallengeModule {}
