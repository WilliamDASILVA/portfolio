/** @jsx h */
import { h } from "preact"
import { tw } from "@twind";

interface IScalableImageProps {
  src: string;
  alt: string;
}

export default function ScalableImage(props: IScalableImageProps) {
  return (
    <div>
      <img src={props.src} alt={props.alt} class={tw(`rounded-lg overflow-hidden`)} />
    </div>
  )
}