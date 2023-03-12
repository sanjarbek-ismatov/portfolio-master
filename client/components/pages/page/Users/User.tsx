import React, { FC } from "react";
import { User } from "types";
import { LazyImage } from "components";
import styles from "./User.module.scss";
const User: FC<{ data: User }> = ({ data }) => {
  return (
    <div className={styles.container}>
      <LazyImage
        className={styles.image}
        height={70}
        width={70}
        filename={data.image}
        spinnerOptions={{
          size: "50",
          position: "absolute",
          border: "1",
          speed: "1",
        }}
      />
      <div className={styles.description}>
        <div className={styles.title}>
          <h3>
            {data.firstname} {data.lastname}
          </h3>
          <p>{data.portfolios.length}ta portfolio</p>
        </div>
        <p>{data.email}</p>
      </div>
    </div>
  );
};

export default User;
