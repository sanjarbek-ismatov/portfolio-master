import LazyImage from "components/LazyImage";
import React, { useEffect, useState } from "react";
import { commentType, portfolio, user } from "types/portfolio";
import { getMe } from "utils/getDetails";
import { serverUrl } from "utils/serverUrl";
import s from "styles/Comment.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SubmitHandler, useForm } from "react-hook-form";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
} from "state/api/portfolioApi";
import { faTrash, faTrashCan } from "@fortawesome/free-solid-svg-icons";

const Comment = ({ data }: { data: portfolio }) => {
  const [createComment, { status: queryStatus, data: queryData }] =
    useCreateCommentMutation();
  const [deleteComment, { data: updateComment }] = useDeleteCommentMutation();
  const { handleSubmit, register, resetField } = useForm<commentType>();
  const [me, setMe] = useState<user>();
  const [comments, setComments] = useState(data.comments);
  useEffect(() => {
    getMe().then((datas) => setMe(datas.data.user));
  }, [data]);
  const url = serverUrl();
  if (!me) {
    return null;
  }
  return (
    <div>
      <form
        method="PUT"
        onSubmit={handleSubmit((formData: any) => {
          createComment({ id: data._id, body: formData }).then((datas: any) =>
            setComments(datas.data)
          );
          resetField("body");
        })}
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
            autoComplete="off"
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
      {!comments ? (
        <div className={s.commentContainer}>
          <p>Hozircha izohlar mavjud emas</p>
        </div>
      ) : (
        ""
      )}
      {comments.map((e, i) => (
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
            <h5>
              {e.body}{" "}
              {e.commentAuthor._id.includes(me._id) ? (
                <FontAwesomeIcon
                  onClick={() => {
                    deleteComment({ id: data._id, index: i }).then(
                      (datas: any) => setComments(datas.data)
                    );
                  }}
                  className={s.trashIcon}
                  icon={faTrashCan}
                />
              ) : null}
            </h5>
            <p>{new Date(e.date).toLocaleDateString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comment;
