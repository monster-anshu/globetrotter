import { GEMINI_API_KEY } from '@/env';
import {
  GoogleGenerativeAI,
  ResponseSchema,
  SchemaType,
} from '@google/generative-ai';
import { Question, QuestionModel } from './question.schema';
import sample from './sample.json';

const prompt = `
Generate ${150} unique locations for a geography guessing game.

REQUIREMENTS:
- Each location should have a "name" field containing ONLY the city name
- Each location should have 3-5 "clues" about the location that increase in difficulty
- Each location should have 3 interesting "funFacts" 
- Each location should have 3 "trivia" items that are less known
- Include diverse locations from all continents
- Avoid extremely obscure locations
- Make clues engaging but not too obvious

SAMPLE FORMAT: ${JSON.stringify(sample, null, 0)}
`;

const main = async () => {
  const jsonrepair = await import('jsonrepair');

  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

  const locationSchema: ResponseSchema = {
    type: SchemaType.ARRAY,
    items: {
      type: SchemaType.OBJECT,
      properties: {
        name: { type: SchemaType.STRING },
        clues: {
          type: SchemaType.ARRAY,
          items: { type: SchemaType.STRING },
        },
        funFacts: {
          type: SchemaType.ARRAY,
          items: { type: SchemaType.STRING },
        },
        trivia: {
          type: SchemaType.ARRAY,
          items: { type: SchemaType.STRING },
        },
      },
      required: ['name', 'clues', 'funFacts', 'trivia'],
    },
  };

  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      responseMimeType: 'application/json',
      responseSchema: locationSchema,
    },
  });

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  const json = JSON.parse(jsonrepair.jsonrepair(text)) as {
    name?: string;
    clues?: string[];
    funFacts?: string[];
    trivia?: string[];
  }[];

  const counter = await QuestionModel.countDocuments();
  const dataToSave = [] as Omit<Question, 'createdAt' | 'updatedAt'>[];

  let i = 0;

  for (const item of json) {
    console.log(item);
    if (
      !item.clues?.length ||
      !item.funFacts?.length ||
      !item.name ||
      !item.trivia
    ) {
      return;
    }
    dataToSave.push({
      alias: `dst` + (i + 1 + counter),
      clues: item.clues,
      funFacts: item.funFacts,
      name: item.name,
      trivia: item.trivia,
    });
    i++;
  }

  await QuestionModel.insertMany(dataToSave);

  process.exit(0);
};

void main();
