import React, { useEffect, useState } from "react";
import { portfolio, user } from "types/portfolio";
import { getMe } from "utils/getDetails";
import Image from "next/image";
import { serverUrl } from "utils/serverUrl";

const Profile = () => {
  const url = serverUrl();
  const [data, setData] = useState<portfolio[]>();
  const [user, setUser] = useState<user>();
  useEffect(() => {
    getMe().then((datas) => {
      setData(datas.data.portfolios);
      setUser(datas.data.user);
      console.log(datas);
    });
  }, []);
  return (
    <div>
      {user && !user.isDirect && (
        <>
          <Image
            height={100}
            width={100}
            src={`${url}/image/${user.image}`}
            alt="profile"
            unoptimized
          />
          <h1>
            {user.firstname} {user.lastname}
          </h1>
          <a href={`mailto://${user.email}`}>{user.email}</a>
          <p>@{user.username}</p>
          <p>{user.description}</p>
          <a href={`https://github.com/${user.githubProfile}`}>Github</a>
          <a href={`https://t.me/${user.telegramProfile}`}>Telegram</a>
          <h2>Skillari</h2>
          {user.skills.map((e, i) => (
            <p key={i}>{e}</p>
          ))}
        </>
      )}
    </div>
  );
};

export default Profile;