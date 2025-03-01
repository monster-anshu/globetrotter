import { NODE_ENV } from '@/env';
import mongoose from 'mongoose';

const isProd = NODE_ENV === 'production';

const MONGO_URI = process.env.MONGO_URI as string;

mongoose.set('debug', !isProd);
mongoose.set('autoIndex', !isProd);
mongoose.set('runValidators', true);

const createConnection = (url: string, name: string) => {
  const conn = mongoose.createConnection(url);

  conn.on('error', (err) => console.error(`Mongoose (${name}) error:`, err));
  conn.on('disconnected', () =>
    console.warn(`Mongoose (${name}) disconnected`)
  );
  conn.on('connected', () => console.log(`Mongoose (${name}) connected`));

  return conn;
};
console.log(process.env.MONGO_URI);
export const MONGO_CONNETIONS = {
  DEFAULT: createConnection(MONGO_URI, 'default'),
};

MONGO_CONNETIONS.DEFAULT.on('connection', () => {
  console.log('default connection is open');
});
