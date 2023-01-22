import { likeType, portfolio } from "types/portfolio";
import Like from "./Like";
import s from "styles/M.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import LazyImage from "components/LazyImage";
import { ReactNode } from "react";
export function Description({
  // url,
  // e,
  // auth,
  // likes,
  // i,
  children,
}: {
  // url: string;
  // e: portfolio;
  // auth: any;
  // likes: likeType[] | undefined;
  // i: number;
  children: ReactNode;
}) {
  const router = useRouter();
  return (
    <div className={s.descContainer}>
      {/* <div className={s.desc}>
        <div className={s.profile}>
          <LazyImage
            spinnerOptions={{
              size: "30",
              position: "static",
              border: "2",
              speed: "1",
            }}
            className={s.profileImage}
            url={url}
            height={50}
            width={50}
            filename={e.author.image}
          />
          <p>{e.author.firstname}</p>
        </div>

        <h1>{e.title}</h1>

        <div>
          <Like e={e} likes={likes} i={i} />
        </div>
      </div>
      {e.used.map((e, i) => (
        <span
          onClick={() => router.push(`/page/${router.query.page}?filter=${e}`)}
          className={s.badge}
          key={i}
        >
          {e}
        </span>
      ))} */}
      {children}
    </div>
  );
}
