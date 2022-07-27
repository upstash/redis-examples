import type { Handle } from '@sveltejs/kit';
import { COUNTRY_HEADER, CITY_HEADER } from '$lib/constants';

export const handle: Handle = async function ({ event, resolve }) {
	if (import.meta.env.DEV) {
		event.request.headers.append(CITY_HEADER, 'Kakariko Village');
		event.request.headers.append(COUNTRY_HEADER, 'JP');
	}
	const response = await resolve(event);
	return response;
};
