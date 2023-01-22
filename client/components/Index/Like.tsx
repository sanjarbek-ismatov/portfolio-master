import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ReactNode } from "react";
import { like } from "state/store";
import { faHeart as notLiked } from "@fortawesome/free-regular-svg-icons";
import { faHeart as liked } from "@fortawesome/free-solid-svg-icons";
import { likeType, portfolio } from "types/portfolio";
import s from "styles/M.module.scss";
import cn from "classnames";
const Like = ({}: // e,
// likes,
// i,
{
  // e: portfolio;
  // likes: likeType[] | any;
  // i: number;
  children: ReactNode;
}) => (
  <>
    {/* <FontAwesomeIcon
      cursor={"pointer"}
      onClick={() => {
        like(e._id);
      }}
      className={cn({
        [s.icon]: true,
        [s.liked]: likes[i].isLiked,
        [s.notLiked]: !likes[i].isLiked,
      })}
      icon={likes[i].isLiked ? liked : notLiked}
    />
    <p>{likes && likes[i].count}</p> */}
  </>
);

export default Like;
