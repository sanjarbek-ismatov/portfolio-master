import Image from "next/image";
import { likeType, portfolio } from "types/portfolio";
import { Description } from "./Description";
import s from "styles/M.module.scss";
export function PortfolioCard({
  i,
  likes,
  images,
  auth,
  url,
  e,
}: {
  i: number;
  likes: likeType[] | undefined;
  images: string[];
  auth: any;
  url: string;
  e: portfolio;
}): JSX.Element {
  return (
    <div className={s.post}>
      {likes && (
        <Image
          className={s.postImage}
          loading="lazy"
          placeholder="blur"
          loader={() => images[i]}
          unoptimized
          blurDataURL="https://cdn.pixabay.com/photo/2015/06/24/02/12/the-blurred-819388_1280.jpg"
          height={450}
          width={800}
          alt="portfolio rasmi"
          src={images[i]}
        />
      )}

      <Description auth={auth} url={url} e={e} i={i} likes={likes} />
    </div>
  );
}
