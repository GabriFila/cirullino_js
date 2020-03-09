import BaseScene from 'telegraf/scenes/base';
import redis from '../db';
import { SEND_INVITES_ID } from '../constants';
import { errorMsg } from '../responses';

const sendInvites = new BaseScene(SEND_INVITES_ID);

sendInvites.enter(ctx => {
  console.log('sending invites');

  redis.watch('inviteIdUsed', function(err) {
    if (err) throw err;
    redis.bitpos('inviteIdUsed', 0, (err, firstPos) => {
      if (err) throw err;
      // Process result
      // Heavy and time consuming operation here
      console.log('firstpos:', firstPos);

      redis
        .multi()
        .setbit('inviteIdUsed', firstPos !== -1 ? firstPos : 0, 1)
        .exec((err, results) => {
          /**
           * If err is null, it means Redis successfully attempted
           * the operation.
           */

          if (err) throw err;
          console.log('exec res:', results);
          if (results === null) ctx.reply(...errorMsg());
          else {
            console.log('state', ctx.scene.state);
            console.log('state', ctx.message);
            const { oppUsernames } = ctx.scene.state;
            Promise.all(
              oppUsernames.map(oppUsername =>
                redis.hsetAsync('userInvites', oppUsername, firstPos)
              )
            )
              .then(() =>
                redis.hsetAsync('userInvites', ctx.message.from.id, firstPos)
              )
              .then(() =>
                Promise.all(
                  oppUsernames.map(oppUsername =>
                    redis.hsetAsync(`invites:${firstPos}`, oppUsername, false)
                  )
                )
              )
              .then(() =>
                redis.hsetAsync(
                  `invites:${firstPos}`,
                  ctx.message.from.id,
                  true
                )
              )
              //TODO keep going
              .then(() => sendToUser('shshshs'))
              .catch(err => console.log('err', err));
            /**
             * If results === null, it means that a concurrent redis
             * changed the key while we were processing it and thus
             * the execution of the MULTI command was not performed.
             *
             * NOTICE: Failing an execution of MULTI is not considered
             * an error. So you will have err === null and results === null
             */
          }
        });
    });
  });
});

export default sendInvites;
