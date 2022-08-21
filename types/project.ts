import { IStoryblokImage, IStoryblokStory } from "@/types/storyblok.ts";

export interface IWeek {
  title: string;
  projects: IStoryblokStory<IProject>[];
}

export interface IProject {
  title: string;
  tags: string[];
  description: string;
  image: IStoryblokImage;
}
