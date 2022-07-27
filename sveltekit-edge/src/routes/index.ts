import type { RequestHandler } from './__types/index';
import { CITY_HEADER, COUNTRY_HEADER } from '$lib/constants';
import { get_visitors, add_visitor } from '$lib/data';
import type { Visit } from '$lib/types';

interface GetResponse {
	visited: Visit[];
	current_city: string;
}

export const GET: RequestHandler<GetResponse> = async function ({ request }) {
	let current_city = get_city(request);
	let visited = await get_visitors();

	return {
		body: {
			visited,
			current_city
		}
	};
};

export const POST: RequestHandler = async function ({ request }) {
	const city = get_city(request);
	await add_visitor(city);

	return {
		status: 200,
		body: {
			signed: true
		}
	};
};

function get_city(request: Request) {
	const city = request.headers.get(CITY_HEADER) ?? 'unknown city';
	const country = get_country_name(request.headers.get(COUNTRY_HEADER));
	return `${city}, ${country}`;
}

const display_names = new Intl.DisplayNames(['en'], { type: 'region' });
function get_country_name(countryCode: string | null) {
	if (countryCode) {
		return display_names.of(countryCode);
	}
	return 'unknown country';
}
