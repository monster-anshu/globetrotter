import { signJwt } from '@/libs/test/jwt';
import { UserModelProvider } from '@/mongo/user.schema';
import { Inject, Injectable } from '@nestjs/common';
import { UserCreateDto } from './dto/user-create.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserModelProvider.provide)
    private readonly userModel: typeof UserModelProvider.useValue
  ) {}

  async create({ username }: UserCreateDto, oldUserId?: string) {
    const user = await this.userModel
      .findOneAndUpdate(
        {
          _id: oldUserId,
          status: 'ACTIVE',
        },
        {
          $set: { username },
          $setOnInsert: {
            status: 'ACTIVE',
          },
        },
        {
          new: true,
          upsert: true,
        }
      )
      .lean();

    const token = signJwt({ userId: user._id.toString() });

    return { user, token };
  }

  async getById(userId: string) {
    const user = await this.userModel
      .findOne({
        _id: userId,
        status: 'ACTIVE',
      })
      .lean();

    return user;
  }
}
