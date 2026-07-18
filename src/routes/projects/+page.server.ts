import type { Project } from './+page.js';

import { ITCH_IO_API_KEY } from '$env/static/private';

const CACHE_TTL = 1000 * 60 * 10;
let cachedItch: { cached_at: number, content: Project[] | null } = { cached_at: 0, content: null };

const itchFetch = async (): Promise<Project[]> => {
    let projects: Project[] = [];

    const now = Date.now();

    if (cachedItch.content && CACHE_TTL > now - cachedItch.cached_at) {
        return cachedItch.content;
    }

    let request = await fetch("https://api.itch.io/profile/games", {
        headers: {
          "Authorization": `Bearer ${ITCH_IO_API_KEY}`
        }
    });

    if (!request.ok) {
        throw new Error(await request.text());
    }

    let json = await request.json();

    for (let i = 0; i < json["games"].length; i++) {
        const game = json["games"][i];

        if (game["classification"] != "other") {
            projects.push({ title: game["title"], image_url: game["cover_url"], href: game["url"] });
      }
    }

    cachedItch = { cached_at: now, content: projects };

    return projects;
};

export const load = async ({ }) => {
    return {
        games: await itchFetch()
    }
};
