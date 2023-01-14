import { likeType, portfolio } from "types/portfolio";
import Like from "./Like";
import s from "styles/M.module.scss";
import Image from "next/image";
export function Description({
  url,
  e,
  auth,
  likes,
  i,
}: {
  url: string;
  e: portfolio;
  auth: any;
  likes: likeType[] | undefined;
  i: number;
}) {
  return (
    <div className={s.descContainer}>
      <div className={s.desc}>
        <div className={s.profile}>
          <Image
            className={s.profileImage}
            alt="profile rasmi"
            loader={() => `${url}/image/${e.author.image}`}
            height={50}
            width={50}
            src={`${url}/image/${e.author.image}`}
            unoptimized
          />
          <p>{e.author.firstname}</p>
        </div>

        <h1>{e.title}</h1>

        <div>
          <Like e={e} likes={likes} i={i} />
        </div>
      </div>
      {e.used.map((e, i) => (
        <span className={s.badge} key={i}>
          {e}
        </span>
      ))}
    </div>
  );
}
