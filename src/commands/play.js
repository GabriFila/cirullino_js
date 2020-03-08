/* eslint-disable no-console */
import redis from '../db';
import { errorMsg, alreadyPlayingMsg } from '../responses';
import { COUNT_OPPONENTS_ID } from '../constants';

const playHandler = ctx => {
  ctx.reply('Perfetto! Mi preparo per una nuova partita!');
  const { id } = ctx.message.from;
  redis
    .hexistsAsync('userActiveGroup', `${id}`)

    .then(res => {
      console.log(res);
      if (res === 0) {
        ctx.scene.enter(COUNT_OPPONENTS_ID);
      } else if (res === 1) ctx.reply(...alreadyPlayingMsg());
    })
    .catch(err => {
      console.error(err);
      ctx.reply(...errorMsg());
    });
};

export default playHandler;
