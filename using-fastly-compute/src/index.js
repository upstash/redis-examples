import { Router } from 'flight-path';
import { auth, incr } from '@upstash/redis';

const router = new Router();

auth({
  url: 'https://eu1-liberal-cat-31266.upstash.io',
  token:
      'AX-XACQgOwNjExYWQwM2Y5NzkzNGU3NWFkO3443yujM2NDJkYjM=',
  requestOptions: { backend: 'upstash-db' },
});

router.get('/', async (req, res) => {
  const { data: count } = await incr('count');
  res.send(`Fastly with Upstash! Count: ${count}`);
});

router.listen();
