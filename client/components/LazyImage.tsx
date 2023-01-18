import React, { HTMLAttributes, useState } from "react";
import Image from "next/image";
import Spinner from "./Spinner";
import s from "styles/Image.module.scss";
const LazyImage = ({
  url,
  filename,
  width,
  height,
  spinnerOptions,
  ...rest
}: {
  url: string;
  filename: string;
  width: number;
  height: number;
  spinnerOptions: {
    size: string;
    speed: string;
    border: string;
    position: "absolute" | "static" | "relative";
  } & HTMLAttributes<HTMLDivElement>;
} & HTMLAttributes<HTMLImageElement>) => {
  const [isLoad, setIsLoad] = useState<boolean>(true);
  return (
    <div className={s.container}>
      {isLoad && <Spinner {...spinnerOptions} />}
      <Image
        {...rest}
        width={width}
        onLoadingComplete={() => setIsLoad(false)}
        loading="lazy"
        placeholder="empty"
        height={height}
        unoptimized
        loader={() => `${url}/image/${filename}`}
        alt="Image"
        src={`${url}/image/${filename}`}
      />
    </div>
  );
};

export default LazyImage;
