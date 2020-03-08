import redis from '../db';
import parseUsername from '../helpers/general/parseUsername';

// function to maintain user <-> userId relationship correct, wince user can change own username

const setUserUserId = (username, id) =>
  redis.hsetAsync('users', username, String(id));

const mantainUserRelation = (ctx, next) => {
  console.log('updating username');
  const { id } = ctx.message.from;
  const username = parseUsername(ctx.message.from.username);

  redis
    .hgetAsync('userIds', String(id))
    .then(res => {
      if (res == null)
        redis.hsetAsync('userIds', String(id), username).then(() => {
          setUserUserId(username, id);
        });
      else if (res !== username)
        redis
          .hdelAsync('users', res)
          .then(() => redis.hset('userIds', id, username))
          .then(() => setUserUserId(username, id));
    })
    .catch(err => console.error('errore', err));
  return next();
};

export default mantainUserRelation;
