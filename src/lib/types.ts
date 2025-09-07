export interface PostMetadata {
    title: string;
    description: string;
    date: string;
    published: boolean;
    tags?: string[];
    thumbnail?: string;
    slug?: string;
}

export interface Post extends PostMetadata {
    slug: string;
}