import { Promise } from 'bluebird';
import redis, { createClient } from 'redis';

import { REDIS_URL } from './config';

const db = createClient(REDIS_URL);

Promise.promisifyAll(redis);

// db.hgetAsync('users', 'gabrifila')
//   .then(res => console.log(res))
//   .catch(err => console.error(err));

export default db;
