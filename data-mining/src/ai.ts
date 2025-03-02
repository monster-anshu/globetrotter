import { GEMINI_API_KEY } from "@/env";
import {
  GoogleGenerativeAI,
  ResponseSchema,
  SchemaType,
} from "@google/generative-ai";
import {
  Question,
  QuestionModel,
} from "../../globetrotter-backend/src/mongo/question.schema";

type Location = {
  name: string;
  clues: string[];
  funFacts: string[];
  trivia: string[];
};

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const getGenerativeModel = (schema: ResponseSchema) =>
  genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      temperature: 1,
      topK: 40,
      topP: 0.95,
      responseMimeType: "application/json",
      responseSchema: schema,
    },
  });

const getCities = async (): Promise<string[]> => {
  const locationSchema: ResponseSchema = {
    type: SchemaType.ARRAY,
    items: { type: SchemaType.STRING },
  };

  const model = getGenerativeModel(locationSchema);
  const prompt = `Generate 200 unique popular city names for a geography guessing game in random order.`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return text ? JSON.parse(text) : [];
  } catch (error) {
    console.error("Error fetching cities:", error);
    return [];
  }
};

const getProperties = async (city: string): Promise<Location | null> => {
  const locationSchema: ResponseSchema = {
    type: SchemaType.OBJECT,
    properties: {
      clues: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
      funFacts: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
      trivia: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
    },
    required: ["clues", "funFacts", "trivia"],
  };

  const model = getGenerativeModel(locationSchema);
  const prompt = `
Generate data for ${city} for a geography guessing game.
- Include 3-5 "clues" about the location.
- Include 3 interesting "funFacts".
- Include 3 lesser-known "trivia" items.
`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return text ? JSON.parse(text) : null;
  } catch (error) {
    console.error(`Error fetching data for ${city}:`, error);
    return null;
  }
};

const main = async () => {
  const cities = await getCities();
  if (!cities.length) {
    console.error("No cities were fetched. Exiting.");
    process.exit(1);
  }

  console.log("Fetched cities:", cities);

  const counter = await QuestionModel.countDocuments();
  const dataToInsert: Partial<Question>[] = [];

  let i = 0;

  // Using for loop instead of Promise.all to avoid rate limiting
  for (const city of cities) {
    const property = await getProperties(city);
    if (!property) {
      await delay(3000);
      continue;
    }

    dataToInsert.push({
      ...property,
      name: city,
      alias: `dst${i + 1 + counter}`,
    });
    i++;
    console.log(`Processed ${city}`);

    await delay(1000);
  }

  await QuestionModel.insertMany(dataToInsert);

  console.log("Data insertion complete.");
  process.exit(0);
};

main();
