import { redirect } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit';
import { PASSWORD } from '$env/static/private';
export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/sozluk')) {
		const authCookie = event.cookies.get('auth');

		if (authCookie !== PASSWORD) {
			if (event.url.pathname !== '/sozluk/login') {
				throw redirect(303, '/sozluk/login');
			}
		}
	}

	return resolve(event);
};
