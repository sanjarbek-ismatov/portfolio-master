import LazyImage from "components/LazyImage";
import React, { useEffect, useState } from "react";
import { commentType, portfolio, user } from "types/portfolio";
import { getMe } from "utils/getDetails";
import { serverUrl } from "utils/serverUrl";
import s from "styles/Comment.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SubmitHandler, useForm } from "react-hook-form";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { useCreateCommentMutation } from "state/api/portfolioApi";

const Comment = ({ data }: { data: portfolio }) => {
  const [createComment, { status: queryStatus, data: queryData }] =
    useCreateCommentMutation();
  const { handleSubmit, register } = useForm<commentType>();
  const [me, setMe] = useState<user>();
  useEffect(() => {
    getMe().then((datas) => setMe(datas.data.user));
  }, [data]);
  useEffect(() => {
    console.log(queryStatus);
  }, [queryStatus]);

  const url = serverUrl();
  if (!me) {
    return null;
  }
  return (
    <div>
      <form
        method="PUT"
        onSubmit={handleSubmit((formData: any) =>
          createComment({ id: data._id, body: formData })
        )}
      >
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
      <h2>Izohlar</h2>
      {(queryData || data.comments).map((e, i) => (
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
          <div className={s.details}>
            <h5>{e.body}</h5>
            <p>{new Date(e.date).toLocaleDateString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comment;
