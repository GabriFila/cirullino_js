/* eslint-disable no-console */
import BaseScene from 'telegraf/scenes/base';
import { TRUE, COUNT_OPPONENTS_ID, SEND_INVITES_ID } from '../constants';
import parseUsername from '../helpers/general/parseUsername';
import redis from '../db';
import {
  notANumberMsg,
  askANumberMsg,
  notOwnUsername,
  askUsername,
  notStartedBotMsg,
  userAlreadyPlayingMsg
} from '../responses';

const countOpponents = new BaseScene(COUNT_OPPONENTS_ID);

countOpponents.enter(ctx => {
  ctx.reply(...askANumberMsg());
});

countOpponents.hears(/^[1-3]$/, ctx => {
  console.log('told number of opponents');
  ctx.scene.state.stillToAsk = ctx.message.text;
  ctx.scene.state.oppUsernames = [];
  ctx.reply(`Dimmi lo username del giocatore 1`);
});

// regex for a messagge which is not a command not command
countOpponents.hears(/^(?!\/)/, ctx => {
  console.log('told opponent');
  console.log(ctx.scene.state);
  // check if user has already told number
  if (ctx.scene.state.oppUsernames) {
    const username = parseUsername(ctx.message.text);
    if (username !== parseUsername(ctx.message.from.username)) {
      redis
        .hgetAsync('users', username)
        .then(userId => {
          console.log(userId);
          if (userId === null) ctx.reply(...notStartedBotMsg(userId));
          else
            redis.hexistsAsync('userActiveGroup', userId).then(outcome => {
              if (outcome === TRUE) ctx.reply(...userAlreadyPlayingMsg());
              else {
                ctx.scene.state.stillToAsk -= 1;
                const { stillToAsk } = ctx.scene.state;

                ctx.scene.state.oppUsernames.push(userId);

                if (stillToAsk === 0) {
                  const { oppUsernames } = ctx.scene.state;
                  ctx.scene.enter(SEND_INVITES_ID, { oppUsernames });
                } else {
                  ctx.reply(
                    ...askUsername(ctx.scene.state.oppUsernames.length + 1)
                  );
                  ctx.scene.enter(COUNT_OPPONENTS_ID);
                }
              }
            });
        })
        .catch(err => console.error(err));
    } else ctx.reply(...notOwnUsername());
  } else ctx.reply(...notANumberMsg());
});

countOpponents.leave(() => console.log('/exit on countOpponents'));
export default countOpponents;
