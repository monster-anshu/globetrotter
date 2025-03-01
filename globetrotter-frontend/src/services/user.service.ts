import { client } from './client';

export class UserService {
  static async info() {
    const { data } = await client.get('/user');
    return data;
  }

  static async create(body: AddUserRequest) {
    const { data } = await client.post('/user', body);
    return data;
  }
}

type AddUserRequest = {
  username?: string;
};
