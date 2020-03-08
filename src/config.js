require('dotenv').config();

export const { URL } = process.env;
export const { BOT_TOKEN } = process.env;
export const { PORT } = process.env || 3001;
export const { NODE_ENV } = process.env;
export const { REDIS_URL } = process.env;
