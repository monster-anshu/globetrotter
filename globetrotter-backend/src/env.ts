import 'dotenv/config';

export const NODE_ENV = process.env.NODE_ENV;
export const MONGO_URI = process.env.MONGO_URI as string;
export const GEMINI_API_KEY = process.env.GEMINI_API_KEY as string;
