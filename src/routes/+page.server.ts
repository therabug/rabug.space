import { BIRTHDATE } from '$env/static/private';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    const birthDate = new Date(BIRTHDATE);
    const now = new Date();

    const diffMs = now.getTime() - birthDate.getTime();
    const years = Math.floor(diffMs / (365.25 * 24 * 60 * 60 * 1000));

    return {
        age: { years }
    }
}