import { signJwt } from '@/libs/test/jwt';
import { UserModelProvider } from '@/mongo/user.schema';
import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { UserCreateDto } from './dto/user-create.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserModelProvider.provide)
    private readonly userModel: typeof UserModelProvider.useValue
  ) {}

  async create({ username }: UserCreateDto, oldUserId?: string) {
    if (username) {
      const alreadExists = await this.userModel.exists({
        username: username,
        status: 'ACTIVE',
      });

      if (alreadExists && oldUserId !== alreadExists._id.toString()) {
        throw new ConflictException('USERNAME_ALREADY_USED');
      }
    }

    const user = await this.userModel
      .findOneAndUpdate(
        {
          _id: oldUserId || new Types.ObjectId(),
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
    const userToSend = {
      userId: user._id,
      status: user.status,
      score: user.score,
      username: user.username,
    };
    return { user: userToSend, token };
  }

  async getById(userId: string) {
    const user = await this.userModel
      .findOne({
        _id: userId,
        status: 'ACTIVE',
      })
      .lean();

    if (!user) {
      return null;
    }

    return {
      userId: user._id,
      status: user.status,
      score: user.score,
      username: user.username,
    };
  }

  async incScore(userId: string) {
    await this.userModel.findOneAndUpdate(
      {
        _id: userId,
        status: 'ACTIVE',
      },
      {
        $inc: { score: 1 },
      }
    );
  }
}
