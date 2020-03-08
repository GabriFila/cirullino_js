import redis from '../db';
import parseUsername from '../helpers/general/parseUsername';

// function to maintain user <-> userId relationship correct, wince user can change own username

const setUserUserId = (username, id) => {
  redis.hset('users', username, String(id), err => {
    if (err) console.log(err.message);
  });
};

const mantainUserRelation = (ctx, next) => {
  console.log('updating username');
  const { id } = ctx.message.from;
  const username = parseUsername(ctx.message.from.username);

  console.log(id, username);
  redis
    .hgetAsync('userIds', String(id))
    .then(res => {
      console.log('first', res);

      if (res == null)
        redis.hsetAsync('userIds', String(id), username).then(res => {
          setUserUserId(username, id);
        });
      else if (res != username)
        redis
          .hdelAsync('users', res)
          .then(res => redis.hset('userIds', id))
          .then(res => setUserUserId(username.id));
    })
    .catch(err => console.error('errore', err));

  // redis.hget('userIds', String(id), (err, res) => {
  //   if (err) console.log(err);
  //   else if (res == null) {
  //     redis.hset('userIds', String(id), username, (err, res) => {
  //       if (err) console.log(err.message);
  //       else setUserUserId(username, id);
  //     });
  //   } else if (res != username)
  //     redis.hdel('users', res, err => {
  //       if (err) console.log(err.message);
  //       else
  //         redis.hset('userIds', String(id), username, err => {
  //           if (err) console.log(err.message);
  //           else setUserUserId(username, id);
  //         });
  //     });
  // });
  return next();
};

export default mantainUserRelation;
