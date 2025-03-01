import { GEMINI_API_KEY } from "@/env";
import {
  GoogleGenerativeAI,
  ResponseSchema,
  SchemaType,
} from "@google/generative-ai";
// import sample from "./sample.json";
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

const getCities = async () => {
  const locationSchema: ResponseSchema = {
    type: SchemaType.ARRAY,
    items: {
      type: SchemaType.STRING,
    },
  };

  const prompt = `Generate ${200} unique popular cities names for a geography guessing game. Cities should be in random order`;

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: locationSchema,
    },
  });

  const result = await model.generateContent(prompt);
  const json = JSON.parse(result.response.text());
  return json as string[];
};

const getProperties = async (city: string) => {
  const prompt = `
Generate data for ${city} for a geography guessing game.

REQUIREMENTS:
- data should have 3-5 "clues" about the location
- data should have 3 interesting "funFacts" 
- data should have 3 "trivia" items that are less known
`;

  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

  const locationSchema: ResponseSchema = {
    type: SchemaType.OBJECT,
    properties: {
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
    required: ["clues", "funFacts", "trivia"],
  };

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      temperature: 1,
      topK: 40,
      topP: 0.95,
      responseMimeType: "application/json",
      responseSchema: locationSchema,
    },
  });

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  const json = JSON.parse(text) as Location;

  return json;
};

const main = async () => {
  const pLimit = await import("p-limit");
  const limit = pLimit.default(1);

  const dataToInsert: Omit<Question, "createdAt" | "updatedAt">[] = [];
  const cities = await getCities();

  console.log("Fetched cities : ", cities);
  const counter = await QuestionModel.countDocuments();

  const tasks = cities.map((city, index) =>
    limit(async () => {
      try {
        const property = await getProperties(city);
        dataToInsert.push({
          ...property,
          name: city,
          alias: `dst${index + 1 + counter}`,
        });
        console.log(`Processed ${city}`);
      } catch (error) {
        console.error(`Error processing ${city}:`, error);
      }
    })
  );

  await Promise.all(tasks);
  await QuestionModel.insertMany(dataToInsert);

  process.exit(0);
};

main();
