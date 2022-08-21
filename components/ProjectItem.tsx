/** @jsx h */
import { h } from "preact"
import { tw } from "@twind";

import { IProject } from "@/types/project.ts";
import ScalableImage from "@/islands/ScalableImage.tsx";

export default function WorkItem(props: IProject) {
  return (
    <article class={tw`mb-4`}>
      <h2 class={tw`text-lg font-bold mb-1`}>{props.title}</h2>
      <div class={tw`flex mb-2`}>
        {props.tags.map(tag => {
          return (
            <div class={tw`text-sm bg-gray-200 px-2 py-1 capitalize rounded text-gray-700 mr-2`}>{tag}</div>
          )
        })}
      </div>

      <ScalableImage
        src={props.image.filename}
        alt={props.image.alt}
      />
    </article>
  )
}
