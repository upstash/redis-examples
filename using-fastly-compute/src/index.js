import { Router } from 'flight-path';
import { Redis } from '@upstash/redis/fastly';

const router = new Router();

const redis = new Redis({
  url: 'https://eu1-liberal-cat-31266.upstash.io',
  token:
    'AX-XACQgOwNjExYWQwM2Y5NzkzNGU3NWFkO3443yujM2NDJkYjM=',
  backend: 'upstash-db'
});

router.get('/', async (req, res) => {
  const count = await redis.incr('count');
  res.send(`Fastly with Upstash! Count: ${count}`);
});

router.listen();
