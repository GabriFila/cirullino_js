import redis from '../db';
import { errorMsg, alreadyPlayingMsg } from '../responses';

const playHandler = ctx => {
  ctx.reply('Perfetto! Mi preparo per una nuova partita!');
  const { id } = ctx.message.from;
  redis.HEXISTS('userActiveGroup', `${id}`, (err, res) => {
    console.log(res);
    if (err) {
      console.error(err);
      ctx.reply.apply(ctx, errorMsg());
    } else if (res === 1) ctx.reply.apply(ctx, alreadyPlayingMsg());
    else if (res === 0) {
      ctx.scene.enter('count-opponents');
    }
  });
};

export default playHandler;
