import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { like } from "state/store";
import { faHeart as notLiked } from "@fortawesome/free-regular-svg-icons";
import { faHeart as liked } from "@fortawesome/free-solid-svg-icons";
import { likeType, portfolio } from "types/portfolio";
import s from "styles/M.module.scss";
const Like = ({
  e,
  likes,
  i,
}: {
  e: portfolio;
  likes: likeType[] | any;
  i: number;
}) => {
  return (
    <>
      <FontAwesomeIcon
        cursor={"pointer"}
        onClick={() => {
          like(e._id);
        }}
        className={s.icon}
        icon={likes[i].isLiked ? liked : notLiked}
      />
      <p>{likes && likes[i].count}</p>
    </>
  );
};

export default Like;
