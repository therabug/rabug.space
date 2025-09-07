// src/routes/blog/[slug]/+page.ts
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type { PostMetadata } from '$lib/types';

export const load: PageLoad = async ({ params }) => {
    try {
        const paths = import.meta.glob('/src/lib/posts/*.md');
        const path = `/src/lib/posts/${params.slug}.md`;

        if (!paths[path]) {
            throw error(404, `Could not find ${params.slug}`);
        }

        const post = await paths[path]() as any;

        return {
            content: post.default,
            meta: post.metadata as PostMetadata
        };
    } catch (e) {
        console.warn(`Error loading post ${params.slug}:`, e);

        throw error(500, `Error loading post: ${params.slug}. It probably doesn't exist.`);
    }
};