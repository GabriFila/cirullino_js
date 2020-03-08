/* eslint-disable no-console */
import Telegraf from 'telegraf';
import fetch from 'node-fetch';

import { BOT_TOKEN, NODE_ENV, PORT, URL } from './config';

const bot = new Telegraf(BOT_TOKEN);
if (NODE_ENV === 'dev') {
  console.log('in development');
  fetch(`https://api.telegram.org/bot${BOT_TOKEN}/deleteWebhook`)
    .then(res => res.json())
    .then(res => {
      if (res.ok === true && res.result === true)
        console.info('webhook deleted for dev purpose');
      bot.startPolling();
    })
    .catch(err => console.error('bot link error', err.message.red));
} else if (NODE_ENV === 'prod') {
  console.log('in production');
  bot.telegram.setWebhook(`${URL}bot${BOT_TOKEN}`);
  bot.startWebhook(`/bot${BOT_TOKEN}`, null, PORT);
}

export default bot;
