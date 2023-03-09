/** @jsx h */
import { h } from "preact"
import { tw } from "@twind";

interface IScalableImageProps {
  src: string;
  alt: string;
  url: string;
}

export default function ScalableImage(props: IScalableImageProps) {
  return (
    <a href={props.url} target="_blank" class={tw`block transform hover:scale-105 transition-transform ease-in-out duration-250`}>
      <img src={props.src} alt={props.alt} class={tw(`rounded-lg overflow-hidden`)} />
    </a>
  )
}