import BaseScene from 'telegraf/scenes/base';
import redis from '../db';
import { SEND_INVITES_ID } from '../constants';

const sendInvites = new BaseScene(SEND_INVITES_ID);

sendInvites.enter(ctx => {
  let firstPos;
  let mul;
  redis.watchAsync('inviteIdUsed').then(() => {
    redis
      .bitposAsync('inviteIdUsed', 0)
      .then(res => {
        console.log('firstpos: ', res);
        firstPos = res;
        mul = redis.multi();
        mul.setbit('inviteIdUsed', firstPos, 1);
        mul.exec((err, res) => console.log(err, res));
      })
      .catch(err => console.err$ git config credential.helper storeor(err));
  });
});

export default sendInvites;
