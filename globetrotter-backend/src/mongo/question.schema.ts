import { InferSchemaType, Schema } from 'mongoose';
import { MONGO_CONNETIONS } from './connections';

const QuestionSchema = new Schema(
  {
    alias: {
      required: true,
      type: String,
      unique: true,
    },
    clues: [String],
    funFacts: [String],
    name: {
      required: true,
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const QuestionSchemaCollection = 'question';
export const QuestionModel = MONGO_CONNETIONS.DEFAULT.model(
  QuestionSchemaCollection,
  QuestionSchema
);
export const QuestionModelProvider = {
  provide: QuestionSchemaCollection,
  useValue: QuestionModel,
};
export type Question = InferSchemaType<typeof QuestionSchema>;
