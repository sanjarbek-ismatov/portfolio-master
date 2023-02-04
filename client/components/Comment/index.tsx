import LazyImage from "components/LazyImage";
import React, { useEffect, useState } from "react";
import { Comment, Portfolio, User } from "types";
import { getMe } from "utils/getDetails";
import { serverUrl } from "utils/serverUrl";
import s from "styles/Comment.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
} from "state/api/portfolioApi";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { subtractTime } from "utils/dateToReadable";

const Comment = ({ data: { comments, _id } }: { data: Portfolio }) => {
  const [createComment, { data: updatedCommentAfterCreate }] =
    useCreateCommentMutation();
  const [deleteComment, { data: updatedCommentAfterDelete }] =
    useDeleteCommentMutation();
  const { handleSubmit, register, resetField } = useForm<Comment>();
  const [defaultComments, setCurrentComments] = useState<Comment[]>(comments);
  const [me, setMe] = useState<User>();
  useEffect(() => {
    getMe().then(({ data: { user } }) => setMe(user));
  }, []);
  const url = serverUrl();
  if (!me) {
    return null;
  }
  return (
    <div>
      <form
        method="PUT"
        onSubmit={handleSubmit((formData: any) => {
          createComment({ id: _id, body: formData }).then((datas: any) =>
            setCurrentComments(datas.data)
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

      {!defaultComments || !defaultComments.length ? (
        <div className={s.commentContainer}>
          <p>Hozircha izohlar mavjud emas</p>
        </div>
      ) : (
        defaultComments.map((e, i) => (
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
                      deleteComment({ id: _id, index: i }).then((datas: any) =>
                        setCurrentComments(datas.data)
                      );
                    }}
                    className={s.trashIcon}
                    icon={faTrashCan}
                  />
                ) : null}
              </h5>
              <p>{subtractTime(e.date)}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
export default Comment;
