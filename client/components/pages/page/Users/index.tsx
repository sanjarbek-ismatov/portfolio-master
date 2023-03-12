import React, { FC } from "react";
import type { User } from "types";
import UserComponent from "./User";
import Link from "next/link";
import styles from "./User.module.scss";
const Index: FC<{ data: User[] }> = ({ data }) => {
  return (
    <div className={styles.mainContainer}>
      <h1>Foydalanuvchilar</h1>
      {data.map((e, i) => (
        <Link key={i} href={`/profile/${e.username}`}>
          <div>
            <UserComponent data={e} />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Index;
