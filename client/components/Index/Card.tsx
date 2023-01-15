import Image from "next/image";
import { likeType, portfolio } from "types/portfolio";
import { Description } from "./Description";
import s from "styles/M.module.scss";
import { useRouter } from "next/router";
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
        <Image
          onClick={() =>
            router.push(
              `/portfolio/${e.author.username}_${e.title.replace(" ", "+")}`
            )
          }
          className={s.postImage}
          loading="lazy"
          placeholder="blur"
          loader={() => `${url}/image/${e.images[0]}`}
          unoptimized
          blurDataURL="https://cdn.pixabay.com/photo/2015/06/24/02/12/the-blurred-819388_1280.jpg"
          height={450}
          width={800}
          alt="portfolio rasmi"
          src={`${url}/image/${e.images[0]}`}
        />
      )}

      <Description auth={auth} url={url} e={e} i={i} likes={likes} />
    </div>
  );
}
