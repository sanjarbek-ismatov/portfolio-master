import LazyImage from "components/LazyImage";
import React, { useEffect, useState } from "react";
import { portfolio, user } from "types/portfolio";
import { getMe } from "utils/getDetails";
import { serverUrl } from "utils/serverUrl";
import s from "styles/Comment.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm, SubmitHandler } from "react-hook-form";
import { faComment, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { FieldValues } from "react-hook-form/dist/types";
const Comment = ({ data }: { data: portfolio }) => {
  const { handleSubmit, register } = useForm();
  const [me, setMe] = useState<user>();
  useEffect(() => {
    getMe().then((datas) => setMe(datas.data.user));
  }, [data]);
  const status = (data: any) => console.log(data);
  const url = serverUrl();
  if (!me) {
    return null;
  }
  return (
    <div>
      <form method="PUT" onSubmit={handleSubmit(status)}>
        <div className={s.commentContainer}>
          <LazyImage
            className={s.profileImage}
            width={50}
            height={50}
            spinnerOptions={{
              size: "50",
              speed: "1",
              border: "2",
              position: "static",
            }}
            filename={me?.image}
            url={url}
          />{" "}
          <input
            className={s.input}
            {...register("body")}
            type="text"
            required
            placeholder="Izoh yozib qoldiring"
          />
          <button type="submit" className={s.iconContainer}>
            <FontAwesomeIcon className={s.icon} icon={faComment} />
          </button>
        </div>
      </form>
      {data &&
        data.comments &&
        data.comments.map((e, i) => (
          <div className={s.commentContainer} key={i}>
            <LazyImage
              className={s.profileImage}
              width={50}
              height={50}
              spinnerOptions={{
                size: "50",
                speed: "1",
                border: "2",
                position: "static",
              }}
              filename={e.commentAuthor.image}
              url={url}
            />
            <p key={i}>{e.body}</p>
          </div>
        ))}
    </div>
  );
};

export default Comment;
