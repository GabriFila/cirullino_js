require('dotenv').config();

export const URL = process.env.URL;
export const BOT_TOKEN = process.env.BOT_TOKEN;
export const PORT = Number(process.env.PORT) || 3001;
export const NODE_ENV = process.env.NODE_ENV;
export const REDIS_URL = process.env.REDIS_URL;
