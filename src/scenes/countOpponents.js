/* eslint-disable no-console */
import { COUNT_OPPONENTS_ID } from '../constants';

import BaseScene from 'telegraf/scenes/base';
import dispButtons from '../helpers/general/dispButtons';
import parseUsername from '../helpers/general/parseUsername';

const countOpponents = new BaseScene(COUNT_OPPONENTS_ID);

// take target catch from user and

countOpponents.enter(ctx => {
  ctx.reply('Dimmi un numero tra 1 e 3', dispButtons(['1', '2', '3']));
});

countOpponents.hears(/^[1-3]$/, ctx => {
  console.log('told number of opponents');
  ctx.session.stillToAsk = ctx.message.text;
  ctx.session.oppUsernames = [];
  ctx.reply(`Dimmi lo username del giocatore 1`);
});
// regex for not command
countOpponents.hears(/^(?!\/)/, ctx => {
  console.log('told opponent');

  if (ctx.session.oppUsernames) {
    if (
      parseUsername(ctx.message.text) !==
      parseUsername(ctx.message.from.username)
    ) {
      ctx.session.stillToAsk -= 1;
      const { stillToAsk } = ctx.session;
      ctx.session.oppUsernames.push(parseUsername(ctx.message.text));

      if (stillToAsk === 0) ctx.scene.enter('check-opponents');
      else {
        ctx.reply(
          `Dimmi lo username del giocatore ${ctx.session.oppUsernames.length +
            1}`
        );
        ctx.scene.enter('count-opponents');
      }
    } else
      ctx.reply('Il tuo username è già compreso, dimmi gli altri giocatori');
  } else
    ctx.reply('Devi dirmi un numero tra 1 e 3', dispButtons(['1', '2', '3']));
});

countOpponents.leave(() => console.log('/exit on countOpponents'));
export default countOpponents;
