import { APP_URL } from '@/env';

export const createChallengeURL = (challengeId: string) => {
  return `${APP_URL}/challenge/${challengeId}`;
};
