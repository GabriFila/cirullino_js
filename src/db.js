import { Promise } from 'bluebird';
import redis, { createClient } from 'redis';

import { REDIS_URL } from './config';

const db = createClient(REDIS_URL);

Promise.promisifyAll(redis);

export default db;
