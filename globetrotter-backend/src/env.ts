import 'dotenv/config';

export const NODE_ENV = process.env.NODE_ENV;
export const MONGO_URI = process.env.MONGO_URI as string;
export const JWT_SECRET = process.env.JWT_SECRET as string;
