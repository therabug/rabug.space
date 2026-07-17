import type { PageServerLoad } from "./$types";

import { BIRTHDATE } from "$env/static/private";

export const load: PageServerLoad = async ({ params }) => {
    let age = new Date(Date.now()).getFullYear() - new Date(BIRTHDATE).getFullYear();

    return {
      age
    };
}
