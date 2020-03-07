import Telegraf from 'telegraf';
import fetch from 'node-fetch';

import { BOT_TOKEN, NODE_ENV, PORT, URL } from './config';

const bot = new Telegraf(BOT_TOKEN);
console.log('env: ', NODE_ENV);
if (NODE_ENV === 'dev') {
  fetch(`https://api.telegram.org/bot${BOT_TOKEN}/deleteWebhook`)
    .then(() => {
      console.info('webhook deleted for dev purpose');
      bot.startPolling();
    })
    .catch(err => console.error(err.message.red));
} else if (NODE_ENV === 'prod') {
  console.log('in production');
  bot.telegram.setWebhook(`${URL}bot${BOT_TOKEN}`);
  bot.startWebhook(`/bot${BOT_TOKEN}`, null, PORT);
}

export default bot;
