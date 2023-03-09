/** @jsx h */
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { Fragment, h } from "preact";
import { tw } from "@twind";
import { PageProps, HandlerContext } from "$fresh/server.ts";
import { asset, Head } from "$fresh/runtime.ts";
import dayjs from "https://esm.sh/dayjs@1.11.7";
import weekOfYear from "https://esm.sh/dayjs@1.11.7/plugin/weekOfYear";

import ProjectItem from "@/components/ProjectItem.tsx";
import Dots from "@/islands/Dots.tsx";
import { IProject, IArtstationProject, IArtstationProjectResponse, IMonth } from "../types/project.ts";

dayjs.extend(weekOfYear);

export const handler = {
  async GET(_: Request, context: HandlerContext) {
    const artstationResponse = await fetch("https://www.artstation.com/users/lordoflolcats/projects.json&&user_id=6241531");

    const projects: IArtstationProjectResponse = await artstationResponse.json();
    interface Month {
      month: number;
      year: number;
      projects: IArtstationProject[];
    }
    const months: Month[] = [];

    if (projects.data) {
      for (const project of projects.data) {
        const monthNumber = dayjs(project.published_at).month();
        const yearNumber = dayjs(project.published_at).year();

        /**
         * Check if there is already a week for this weekNumber
         */
        const week = months.find(week => week.month === monthNumber && week.year === yearNumber);

        if (week) {
          week.projects.push(project);
        } else {
          months.push({
            month: monthNumber,
            year: yearNumber,
            projects: [project],
          });
        }
      }
    }

    const mappedMonths = months
      .sort((a, b) => {
        const aDate = dayjs().month(a.month).year(a.year);
        const bDate = dayjs().month(b.month).year(b.year);

        return aDate.diff(bDate);
      })
      .reverse()
      .map(month => {
        return {
          month: month.month,
          year: month.year,
          projects: month.projects.map(project => {
            return {
              id: project.id,
              title: project.title,
              description: project.description,
              tags: ["3D"],
              url: project.permalink,
              image: project.cover.small_square_url,
            }
          }),
        };
      });

    return await context.render({ months: mappedMonths });
  }
}

export default function Home(props: PageProps<{ months: IMonth[] }>) {
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

        {props.data.months.map(month => {
          const { month: monthNumber, year, projects } = month;
          const title = dayjs().month(monthNumber).year(year).format("MMMM YYYY");

          return (<div>
            <h2 class={tw`text-3xl font-medium my-3`}>{title}</h2>

            {projects.map(project => {
              const { title, tags, description, image, url } = project;

              return (<ProjectItem
                id={project.id}
                key={project.id}
                title={title}
                tags={tags}
                description={description}
                image={image}
                url={url}
              />)
            })}
          </div>)
        })}
      </div>
    </Fragment>
  );
}
