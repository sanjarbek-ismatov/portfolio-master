import React, { HTMLAttributes } from "react";
import s from "styles/Spinner.module.scss";
const Spinner = ({
  size,
  speed,
  position,
  border,
  ...rest
}: {
  size: string;
  speed: string;
  border: string;
  position: "absolute" | "static" | "relative";
} & HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      style={{
        height: `${size}px`,
        width: `${size}px`,
        borderWidth: `${border}px`,
        position: position,
      }}
      className={s.spinner}
      {...rest}
    ></div>
  );
};

export default Spinner;
