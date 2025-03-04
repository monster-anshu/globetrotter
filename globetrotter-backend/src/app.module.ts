import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChallengeModule } from './challenge/challenge.module';
import { QuizModule } from './quiz/quiz.module';
import { SessionModule } from './session/session.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [QuizModule, UserModule, SessionModule, ChallengeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
