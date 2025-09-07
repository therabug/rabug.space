import type { PageServerLoad } from './$types';
import type { Post, PostMetadata } from '$lib/types';

export const load: PageServerLoad = async () => {
    let posts: Post[] = [];

    const paths = import.meta.glob('/src/lib/posts/*.md', { eager: true });

    for (const path in paths) {
        const file = paths[path] as any;
        const slug = path.split('/').at(-1)?.replace('.md', '');

        if (file && typeof file === 'object' && 'metadata' in file && slug) {
            const metadata = file.metadata as PostMetadata;
            const post: Post = { ...metadata, slug };

            if (post.published) {
                posts.push(post);
            }
        }
    }

    posts = posts.sort((first, second) =>
        new Date(second.date).getTime() - new Date(first.date).getTime()
    );

    return {
        posts
    };
};