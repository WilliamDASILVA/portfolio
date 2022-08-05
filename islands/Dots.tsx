/** @jsx h */
import { useState, useEffect } from "preact/hooks";
import { h } from "preact";

interface IDotsProps {
  text: string;
}

export default function Dots(props: IDotsProps) {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      if(dots === "...") {
        setDots("");
        return;
      }

      setDots(dots + ".");
    }, 1000);

    return () => {
      clearInterval(interval);
    }
  }, [dots])

  return (
    <div>
      {props.text}{dots}
    </div>
  )
}