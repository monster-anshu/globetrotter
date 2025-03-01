import { client } from './client';

export class ChallengeService {
  static async get(id: string) {
    const { data } = await client.get<GetResponse>(`/challenge/${id}`);
    return data.challengeInfo;
  }
}

export type GetResponse = {
  isSuccess: boolean;
  challengeInfo: ChallengeInfo;
};

export type ChallengeInfo = {
  score: number;
  username: string;
};
