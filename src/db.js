import { REDIS_URL } from './config';
import { promisify } from 'util';

import { createClient } from 'redis';
const redis = createClient(REDIS_URL);

export default redis;
