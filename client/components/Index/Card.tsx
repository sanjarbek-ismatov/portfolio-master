import Image from "next/image";
import { likeType, portfolio } from "types/portfolio";
import { Description } from "./Description";
import s from "styles/M.module.scss";
import { useRouter } from "next/router";
import LazyImage from "components/LazyImage";
export function PortfolioCard({
  i,
  likes,

  auth,
  url,
  e,
}: {
  i: number;
  likes: likeType[] | undefined;

  auth: any;
  url: string;
  e: portfolio;
}): JSX.Element {
  const router = useRouter();
  return (
    <div className={s.post}>
      {likes && (
        <LazyImage
          className={s.postImage}
          onClick={() =>
            router.push(
              `/portfolio/${e.author.username}_${e.title.replace(" ", "+")}`
            )
          }
          filename={e.images[0]}
          width={800}
          height={450}
          url={url}
          spinnerOptions={{
            size: "100",
            position: "absolute",
            border: "5",
            speed: "1",
          }}
        />
      )}

      <Description auth={auth} url={url} e={e} i={i} likes={likes} />
    </div>
  );
}
