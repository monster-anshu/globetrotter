import { GEMINI_API_KEY } from '@/env';
import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';
import { QuestionModel } from './question.schema';

const main = async () => {
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: SchemaType.ARRAY,
        items: {
          type: SchemaType.OBJECT,
          properties: {
            clues: {
              type: SchemaType.ARRAY,
              items: {
                type: SchemaType.STRING,
              },
            },
            funFacts: {
              type: SchemaType.ARRAY,
              items: {
                type: SchemaType.STRING,
              },
            },
            name: {
              type: SchemaType.STRING,
            },
          },
        },
      },
    },
  });

  const prompt = `Generate data for a location guessing game. Provide diverse locations worldwide, covering famous cities, landmarks, and cultural spots. Keep clues fun but not too obvious. generate atleast 100+ items.
name should contain only city name  
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  const json = JSON.parse(text) as {
    name: string;
    clues: string[];
    funFacts: string[];
  }[];

  const lastCreated = await QuestionModel.findOne({})
    .sort({ createdAt: -1 })
    .lean();

  const counter = +(lastCreated?.alias.split('dst').at(1) || '0');
  await QuestionModel.insertMany(
    json.map((item, i) => ({
      alias: `dst` + (i + 1 + counter),
      clues: item.clues,
      funFacts: item.funFacts,
      name: item.name,
    }))
  );
};

void main();
