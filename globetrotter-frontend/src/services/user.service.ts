import { client } from './client';

export class UserService {
  static async info() {
    const { data } = await client.get<UserInfoResponse>('/user');

    if (!data.user) {
      const user = await UserService.create({});
      return user;
    }

    return data.user;
  }

  static async create(body: AddUserRequest) {
    const { data } = await client.post<UserInfoResponse>('/user', body);
    return data.user;
  }
}

type AddUserRequest = {
  username?: string;
};

export type UserInfoResponse = {
  isSuccess: boolean;
  user: User;
};

export type User = null | {
  userId: string;
  status: string;
  score: number;
  username: string;
  incorrect: number;
};
