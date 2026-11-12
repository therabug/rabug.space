import type { PageServerLoad } from "./$types";

import { BIO_MARKDOWN_URL, BIRTHDATE } from "$env/static/private";
import { marked } from "marked";

const CACHE_TTL = 1000 * 60 * 10; // 10 minutes
let bio: { cached_at: number, data: null | string } = { cached_at: 0, data: null };

const getBio = async () => {
  const now = Date.now();

  if (CACHE_TTL > now - bio.cached_at && bio.data) {
      return bio.data;
  }

  const response = await fetch(BIO_MARKDOWN_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch!');
  }
  const markdown = await response.text();
  const html = await marked(markdown);

  bio.data = html;
  bio.cached_at = now;
  return html;
}


const calculateAge = (birthdate: Date): number => {
  const today = new Date();

  let age = today.getFullYear() - birthdate.getFullYear();

  const monthDifference = today.getMonth() - birthdate.getMonth();
  const dayDifference = today.getDate() - birthdate.getDate();

  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--;
  }

  return age;
};

export const load: PageServerLoad = async ({ setHeaders }) => {
  setHeaders({ "cache-control": "public, max-age=600" });

    let age = calculateAge(new Date(BIRTHDATE));

    let bio = await getBio();

    return {
        age,
        bio
    };
}
