/** @jsx h */
import { h } from "preact"
import { tw } from "@twind";

interface IWorkProps {
  title: string;
  tags: string[];
  content: string;
}

export default function WorkItem(props: IWorkProps) {
  return (
    <article class={tw`mb-4`}>
      <h2 class={tw`text-lg font-bold`}>{props.title}</h2>
      <div class={tw`flex mb-4`}>
        {props.tags.map(tag => {
          return (
            <div class={tw`text-sm text-gray-700 mr-2`}>{tag}</div>
          )
        })}
      </div>

      <div
        class="markdown"
        dangerouslySetInnerHTML={{ __html: props.content }}
      />
    </article>
  )
}
