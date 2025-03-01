import { ChallengeService } from '@/services/challenge.service';
import { queryOptions } from '@tanstack/react-query';

export const challengeQuery = (challengeId: string) =>
  queryOptions({
    queryKey: ['challenge', challengeId],
    queryFn: () => ChallengeService.get(challengeId),
  });
