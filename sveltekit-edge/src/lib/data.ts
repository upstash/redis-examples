import { Redis } from '@upstash/redis';
import type { Visit } from './types';

const set_name = 'visitors';

export async function get_visitors(): Promise<Visit[]> {
	const redis = Redis.fromEnv();
	const visitors = await redis.zrange<string[]>(set_name, 0, -1, { withScores: true });
	return adapt_visitors(visitors);
}

export async function add_visitor(city: string) {
	const redis = Redis.fromEnv();
	await redis.zincrby(set_name, 1, city);
}

// takes the result from ZRANGE and adapt it into a list of visits
// e.g. ['Seattle', '2', 'Los Angeles', '1'] becomes
// [ { city: 'Seattle', count: '2'}, { city: 'Los Angeles', count: '1' } ]
function adapt_visitors(visitors: string[]): Visit[] {
	const adapted: Visit[] = [];
	for (let i = 0; i < visitors.length; i += 2) {
		const member = visitors[i];
		const score = visitors[i + 1];
		adapted.push({ city: decodeURIComponent(member), count: score });
	}
	return adapted;
}
