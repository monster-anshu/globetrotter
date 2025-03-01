import { Controller, Get, Param } from '@nestjs/common';
import { ChallengeService } from './challenge.service';

@Controller('challenge')
export class ChallengeController {
  constructor(private readonly challengeService: ChallengeService) {}

  @Get(':id')
  async get(@Param('id') id: string) {
    const challengeInfo = await this.challengeService.get(id);
    return {
      isSuccess: true,
      challengeInfo,
    };
  }
}
