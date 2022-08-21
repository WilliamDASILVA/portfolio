export interface IStoryblokImage {
  id: number;
  name: string;
  alt: string;
  filename: string;
}

export interface IStoryblokStory<T> {
  id: number;
  content: T,
  slug: string,
  published_at: string,
  created_at: string,
}
