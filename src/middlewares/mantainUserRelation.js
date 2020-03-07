import redis from '../db';
import parseUsername from '../helpers/general/parseUsername';

// function to maintain user <-> userId relationship correct, wince user can change own username

const mantainUserRelation = (ctx, next) => {
  console.log('updating username');
  const { id } = ctx.message.from;
  const username = parseUsername(ctx.message.from.username);

  redis.hget('userIds', String(id), (err, res) => {
    if (err) console.log(err);
    else if (res == null) {
      redis.hset('userIds', String(id), username, (err, res) => {
        if (err) console.log(err.message);
        else setUserUserId(username, id);
      });
    } else if (res != username)
      redis.hdel('users', res, err => {
        if (err) console.log(err.message);
        else
          redis.hset('userIds', String(id), username, err => {
            if (err) console.log(err.message);
            else setUserUserId(username, id);
          });
      });
  });
  return next();
};

const setUserUserId = (username, id) => {
  redis.hset('users', username, String(id), err => {
    if (err) console.log(err.message);
  });
};

export default mantainUserRelation;
