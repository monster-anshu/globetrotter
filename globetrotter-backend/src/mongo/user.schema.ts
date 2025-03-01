import { InferSchemaType, Schema } from 'mongoose';
import { MONGO_CONNETIONS } from './connections';

const UserSchema = new Schema(
  {
    username: String,
    score: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      required: true,
      enum: ['ACTIVE', 'DELETED'] as const,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const UserSchemaCollection = 'user';
const UserModel = MONGO_CONNETIONS.DEFAULT.model(
  UserSchemaCollection,
  UserSchema
);
export const UserModelProvider = {
  provide: UserSchemaCollection,
  useValue: UserModel,
};
export type User = InferSchemaType<typeof UserSchema>;
