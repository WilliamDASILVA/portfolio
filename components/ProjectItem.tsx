/** @jsx h */
import { h } from "preact"
import { tw } from "@twind";

import { IProject } from "@/types/project.ts";
import ScalableImage from "@/islands/ScalableImage.tsx";

export default function WorkItem(props: IProject) {
  return (
    <article class={tw`mb-10`}>
      <h2 class={tw`text-lg font-bold mb-1`}>
        <a href={props.url} class={tw`hover:text-blue-500 hover:text-underline`} target="_blank">
          {props.title}
        </a>
      </h2>
      <p class={tw`text-base mb-2`}>
        {props.description}
      </p>
      {props.tags.length > 0 && (
        <div class={tw`flex mb-3`}>
          {props.tags.map(tag => {
            return (
              <div class={tw`text-sm bg-gray-200 px-2 py-1 capitalize rounded text-gray-700 mr-2`}>{tag}</div>
            )
          })}
        </div>
      )}

      <ScalableImage
        src={props.image}
        alt={props.title}
        url={props.url}
      />
    </article>
  )
}
