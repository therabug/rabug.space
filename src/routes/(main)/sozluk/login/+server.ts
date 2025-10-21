import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { PASSWORD } from '$env/static/private';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const { password } = await request.json();

	if (password === PASSWORD) {
		cookies.set('auth', password, {
			path: '/',
			httpOnly: true,
			secure: true,
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 * 7
		});

		return json({ success: true });
	}

	return json({ success: false }, { status: 401 });
};
