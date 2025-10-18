// src/routes/blog/[slug]/+page.ts
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type { PostMetadata } from '$lib/types';

interface PostModule {
	default: any;
	metadata: PostMetadata;
}

export const load: PageLoad = async ({ params }) => {
	const { slug } = params;

	const posts = import.meta.glob<PostModule>('/src/lib/posts/*.md', {
		eager: false
	});

	const path = `/src/lib/posts/${slug}.md`;

	if (!(path in posts)) {
		error(404, {
			message: 'Post not found',
			details: `The post "${slug}" does not exist.`
		});
	}

	try {
		const post = await posts[path]();

		if (!post.default || !post.metadata) {
			error(500, {
				message: 'Invalid post format',
				details: `The post "${slug}" is missing required content or metadata.`
			});
		}

		return {
			content: post.default,
			meta: post.metadata,
			slug
		};
	} catch (e) {
		console.error(`Failed to load post "${slug}":`, e);
		error(500, {
			message: 'Failed to load post',
			details: e instanceof Error ? e.message : 'An unknown error occurred.'
		});
	}
};
