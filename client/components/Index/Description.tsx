import { likeType, portfolio } from "types/portfolio";
import Like from "./Like";
import s from "styles/M.module.scss";
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
    <div className={s.desc}>
      <div className={s.profile}>
        <img
          className={s.profileImage}
          alt="profile rasmi"
          src={`${url}/image/${e.author.image}`}
        />
        <p>{e.author.firstname}</p>
      </div>
      <h1>{e.title}</h1>
      <div>{auth && likes && <Like e={e} likes={likes} i={i} />}</div>
    </div>
  );
}
