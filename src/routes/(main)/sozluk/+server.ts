import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export interface Meaning {
	word: string;
	meaning: string;
}

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json();

	if (!body.wordList || !Array.isArray(body.wordList)) {
		throw error(400, 'wordList parameter is required and must be an array');
	}

	const wordList = body.wordList as string[];
	const meaningList: Meaning[] = [];

	for (const word of wordList) {
		try {
			const meaning = await getWord(word);
			meaningList.push({ word, meaning });
		} catch (err) {
			console.error(`Failed to fetch word: ${word}`, err);
			meaningList.push({ word, meaning: 'Not found' });
		}
	}

	return json(meaningList);
};

const getWord = async (word: string): Promise<string> => {
	const response = await fetch('https://sozluk.gov.tr/gts?ara=' + encodeURIComponent(word), {
		headers: {
			'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:143.0) Gecko/20100101 Firefox/143.0',
			Referer: 'https://sozluk.gov.tr/'
		}
	});

	if (!response.ok) {
		throw new Error('Failed to fetch word');
	}

	const data = await response.json();

	console.log('API response for', word, ':', data);

	if (!Array.isArray(data) || data.length === 0) {
		throw new Error('Word not found');
	}

	const firstResult = data[0];

	if (!firstResult || !firstResult.anlamlarListe || firstResult.anlamlarListe.length === 0) {
		throw new Error('Invalid response format');
	}

	return firstResult.anlamlarListe[0].anlam;
};
