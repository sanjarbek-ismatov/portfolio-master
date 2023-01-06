import React, { useEffect, useState } from "react";
import { user } from "types/portfolio";
import { getMe } from "utils/getDetails";
import Image from "next/image";
import { serverUrl } from "utils/serverUrl";

const Profile = () => {
  const url = serverUrl();
  const [data, setData] = useState<user>();
  useEffect(() => {
    getMe().then((datas) => {
      setData(datas.data);
      console.log(datas);
    });
  }, []);
  return (
    <div>
      {data && !data.isDirect && (
        <>
          <Image
            height={100}
            width={100}
            src={`${url}/image/${data.image}`}
            alt="profile"
            unoptimized
          />
          <h1>
            {data.firstname} {data.lastname}
          </h1>
          <a href={`mailto://${data.email}`}>{data.email}</a>
          <p>@{data.username}</p>
          <p>{data.description}</p>
          <a href={`https://github.com/${data.githubProfile}`}>Github</a>
          <a href={`https://t.me/${data.telegramProfile}`}>Telegram</a>
          <h2>Skillari</h2>
          {data.skills.map((e, i) => (
            <p key={i}>{e}</p>
          ))}
        </>
      )}
    </div>
  );
};

export default Profile;
