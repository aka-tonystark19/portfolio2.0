import React, { useState, useEffect } from "react";

export interface TypeWripterProps {
  text: string;
  className: string;
}

export default function TypeWriter(props: TypeWripterProps) {
  const [text, setText] = useState("");

  const typeChar = (text: string) => {
    let str = "";
    let typeSpeed = 0;

    text.split("").forEach(c => {
      typeSpeed += Math.random() * (50 - 90) + 90;
      setTimeout(() => {
        str += c;
        setText(str);
      }, 700 + typeSpeed);
    });
  };

  useEffect(() => {
    typeChar(props.text);
  }, []);

  return (
    <div className={props.className}>
      {text}
      <span>&nbsp;</span>
    </div>
  );
}
