"use client";
import LazyImage from "components/LazyImage";
import React, { memo, useCallback, useEffect, useState } from "react";
import type { Comment, Portfolio, User } from "types";
import { getMe } from "utils/getDetails";
import s from "styles/Comment.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { faComment, faStar } from "@fortawesome/free-regular-svg-icons";
import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
} from "state/api/portfolioApi";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { subtractTime } from "utils/dateToReadable";
import Link from "next/link";
const CommentComponent = ({ data: { comments, _id } }: { data: Portfolio }) => {
  const [createComment] = useCreateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const { handleSubmit, register, resetField } = useForm<Comment>();
  const [defaultComments, setCurrentComments] = useState<Comment[]>(comments);
  const [me, setMe] = useState<User>();
  const setCurrentUser = useCallback((data: User) => setMe(data), []);
  useEffect(() => {
    getMe().then((data) => typeof data !== "boolean" && setCurrentUser(data));
  }, [setCurrentUser]);
  return (
    <div>
      {me ? (
        <form
          method="PUT"
          onSubmit={handleSubmit((formData: any) => {
            createComment({ id: _id, body: formData }).then((datas: any) => {
              setCurrentComments(datas.data);
            });
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
                position: "absolute",
              }}
              filename={me?.image}
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
      ) : (
        <div className={s.commentContainer}>
          <p>Izoh yozish uchun tizimga kiring!</p>
          <Link href="/auth/login">
            <a style={{ margin: "0 10px" }}>Kirish</a>
          </Link>
        </div>
      )}
      <h2>Izohlar</h2>

      {!defaultComments || !defaultComments.length ? (
        <div className={s.commentContainer}>
          <p>Hozircha izohlar mavjud emas</p>
        </div>
      ) : (
        defaultComments.map((e, i) => (
          <div className={s.comments} key={i}>
            <Link href={`/profile/${e.commentAuthor.username}`}>
              <a className={s.profileIcon}>
                <LazyImage
                  className={s.profileImage}
                  width={40}
                  height={40}
                  spinnerOptions={{
                    size: "40",
                    speed: "1",
                    border: "2",
                    position: "absolute",
                  }}
                  filename={e.commentAuthor.image}
                />
              </a>
            </Link>
            <div className={s.details}>
              <h6>
                {e.commentAuthor.firstname} {e.commentAuthor.lastname}{" "}
                {e.commentAuthor.isAdmin && (
                  <FontAwesomeIcon
                    title="Bu foydalanuvchi admin"
                    height={15}
                    icon={faStar}
                  />
                )}
                <span>{subtractTime(e.date)}</span>
              </h6>
              <p>{e.body} </p>
            </div>
            {(me && e.commentAuthor._id.includes(me._id)) || me?.isAdmin ? (
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
          </div>
        ))
      )}
    </div>
  );
};
export default memo(CommentComponent);
