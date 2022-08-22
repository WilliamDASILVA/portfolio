/** @jsx h */
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { Fragment, h } from "preact";
import { tw } from "@twind";
import StoryblokClient from "storyblok-js-client";
import { PageProps, HandlerContext } from "$fresh/server.ts";
import { asset, Head } from "$fresh/runtime.ts";

import ProjectItem from "@/components/ProjectItem.tsx";
import Dots from "@/islands/Dots.tsx";
import { IStoryblokStory } from "../types/storyblok.ts";
import { IWeek } from "../types/project.ts";

export const handler = {
  async GET(_: Request, context: HandlerContext) {
    const client = new StoryblokClient({
      accessToken: Deno.env.get("STORYBLOK_ACCESS_TOKEN"),
    });

    const weeks = [];
    const stories = await client.getStories({
      starts_with: "weeks/"
    });

    for (const week of stories.data.stories) {
      const formattedWeek = week;
      const projects = await client.getStories({
        by_uuids: week.content.projects.join(",")
      })

      formattedWeek.content.projects = projects.data.stories;
      weeks.push(formattedWeek);
    }

    return await context.render({ weeks: (weeks as unknown as IStoryblokStory<IWeek>[]).sort((a, b) => {
      const aDate = new Date(a.first_published_at);
      const bDate = new Date(b.first_published_at);

      return aDate.getTime() - bDate.getTime();
    }).reverse() });
  }
}

export default function Home(props: PageProps<{ weeks: IStoryblokStory<IWeek>[] }>) {
  return (
    <Fragment>
      <Head>
        <title>William</title>
        <link rel="stylesheet" href="style.css" />
      </Head>
      <div class={tw`p-4 mx-auto max-w-screen-md`}>

        <div>
          <img
            class={tw`rounded-full mb-2`}
            src={asset("/images/logo.png")}
            width="50"
            height="50"
            alt=""
          />

          <div class={tw`mb-6`}>
            <h1 class={tw`text-2xl font-bold`}>
              William DA SILVA
            </h1>
            <Dots text="Learning 3D" />
          </div>
        </div>

        <hr class={tw`mb-4`} />

        {props.data.weeks.map(week => {
          const { title, projects } = week.content;

          return (<div>
            <h2 class={tw`text-3xl font-medium my-3`}>{title}</h2>

            {projects.map(project => {
              const { title, tags, description, image } = project.content;

              return (<ProjectItem
                key={project.id}
                title={title}
                tags={tags}
                description={description}
                image={image}
              />)
            })}
          </div>)
        })}
      </div>
    </Fragment>
  );
}
