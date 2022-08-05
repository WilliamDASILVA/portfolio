/** @jsx h */
import { Fragment, h } from "preact";
import { tw } from "@twind";
import { PageProps, HandlerContext } from "$fresh/server.ts";
import { render } from "gfm";

import { parse } from "https://deno.land/x/frontmatter@v0.1.5/mod.ts";
import { Head } from "https://deno.land/x/fresh@1.0.2/runtime.ts";

interface IWorkHeader {
  title: string;
  tags: string[];
  createdAt: string;
}

interface IWork {
  title: string;
  tags: string[];
  content: string;
}

const files = [
  "lurking.md",
  "lfl-days.md",
]

const works: IWork[] = files
  .map(file => {
    const fileContent = Deno.readTextFileSync(Deno.realPathSync("./content/work/" + file));
    const { data, content } = parse(fileContent) as { data: IWorkHeader, content: string};
    const renderedContent = render(content);

    return {
      title: data.title,
      tags: data.tags,
      createdAt: data.createdAt,
      content: renderedContent,
    }
  })
  .sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

export const handler = {
  async GET(_: Request, context: HandlerContext) {
    return await context.render({ works });
  }
}

export default function Home(props: PageProps<{ works: IWork[] }>) {
  return (
    <Fragment>
      <Head>
        <title>William</title>
        <link rel="stylesheet" href="style.css" />
      </Head>
      <div class={tw`p-4 mx-auto max-w-screen-md`}>

        <h1 class={tw`text-2xl font-bold mb-6`}>
          William DA SILVA
        </h1>

        {props.data.works.map(work => {
          return (
            <article class={tw`mb-4`}>
              <h2 class={tw`text-lg font-bold`}>{work.title}</h2>
              <div class={tw`flex mb-4`}>
                {work.tags.map(tag => {
                  return (
                    <div class={tw`text-sm text-gray-700 mr-2`}>{tag}</div>
                  )
                })}
              </div>

              <div
                class="markdown"
                dangerouslySetInnerHTML={{ __html: work.content }}
              />
            </article>
          )
        })}
      </div>
    </Fragment>
  );
}
