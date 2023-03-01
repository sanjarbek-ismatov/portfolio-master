import { useEffect, useState } from "react";
import { User } from "types";
import { getMe } from "utils/getDetails";
import Image from "next/image";
import { serverUrl } from "utils/serverUrl";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogStatus,
  Footer,
  Form,
  FormArea,
  FormInput,
  FormSubmit,
  NavbarProfile,
} from "components";
import styles from "styles/Profile.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faTelegram } from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faPenToSquare,
  faStar,
} from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  useUpdateProfileMutation,
  useDeletePortfolioMutation,
} from "state/api/portfolioApi";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
const Profile = () => {
  const url = serverUrl();
  const router = useRouter();
  const { username } = router.query;
  const [data, setData] = useState<User>();
  const [message, setMessage] = useState<string>("");
  const { handleSubmit, register } = useForm<User>();
  const [
    updateProfile,
    { isLoading, isError, isSuccess, data: updatedData, error },
  ] = useUpdateProfileMutation();
  const [deletePortfolio, { isSuccess: deleteIsSuccess }] =
    useDeletePortfolioMutation();
  const profileSubmit = (e: User) => {
    setMessage("Yuklanmoqda...");
    const form = new FormData();
    for (const [key, value] of Object.entries(e) as any) {
      if (key === "image" && value.length) form.append(key, value[0]);
      if (key === "password" && value.length) form.append(key, value);
      else if (key !== "password" && key !== "image") form.append(key, value);
    }
    if (!e.image.length && data) form.append("image", data.image);
    updateProfile(form)
      .then(() => setMessage("Yangilandi!"))
      .catch(() => setMessage("Xato"));
  };
  useEffect(() => {
    !username?.length &&
      getMe().then((data) => {
        if (typeof data !== "boolean") {
          setData(data);
        } else {
          router.push("/auth/login");
        }
      });
  }, [router, username]);
  if (!data) {
    return null;
  }
  return (
    <>
      <NavbarProfile />
      <div className={styles.container}>
        <div className={styles.background}>
          <div className={styles.innerContainer}>
            <div className={styles.rowLeft}>
              <div className={styles.absoluteTextContainer}>
                <Image
                  height={200}
                  width={200}
                  src={`${url}/image/${data.image}`}
                  className={styles.image}
                  alt="profile"
                  unoptimized
                />
                <FontAwesomeIcon
                  onClick={() => setMessage("Yangilamoqchimisiz!")}
                  className={styles.icon}
                  icon={faPenToSquare}
                />
                <div>
                  <h2>
                    {data.firstname} {data.lastname}{" "}
                    {data.isAdmin && (
                      <FontAwesomeIcon
                        title="Bu foydalanuvchi admin"
                        height={15}
                        icon={faStar}
                      />
                    )}
                  </h2>
                  <p>@{data.username}</p>
                </div>
              </div>
              <p className={styles.p}>{data?.description}</p>
              <div className={styles.socialLinksContainer}>
                <FontAwesomeIcon
                  className={styles.socialIcon}
                  icon={faGithub}
                />{" "}
                {data.githubProfile}
                <br />
                <FontAwesomeIcon
                  className={styles.socialIcon}
                  icon={faTelegram}
                />{" "}
                {data.telegramProfile}
                <br />
                <FontAwesomeIcon
                  className={styles.socialIcon}
                  icon={faEnvelope}
                />{" "}
                {data.email}
              </div>
              <div className={styles.skills}>
                <h2>Skillari:</h2>
                {data.skills.map((e, i) => (
                  <p key={i}> - {e}</p>
                ))}
              </div>
            </div>
            <div className={styles.rowRight}>
              <h2 className={styles.title}>Portfoliolari:</h2>
              {data.portfolios.length ? (
                data?.portfolios.map((e, i) => (
                  <div key={i} className={styles.portolioContainer}>
                    <div
                      style={{
                        backgroundImage: `url(${
                          url + "/image/" + e.images[0]
                        })`,
                        backgroundPosition: "center",
                      }}
                      className={styles.image}
                    ></div>
                    <div className={styles.content}>
                      <p>{e.title}</p>
                      <Link href={`/portfolio/${e.linktitle}`}>
                        <a className={styles.link}>Ochish</a>
                      </Link>
                    </div>
                    <FontAwesomeIcon
                      icon={faTrash}
                      cursor="pointer"
                      style={{ color: "#3a3a3a" }}
                      onClick={() => {
                        deletePortfolio(e._id).then(() => {
                          router.reload();
                        });
                      }}
                      height={15}
                    />
                  </div>
                ))
              ) : (
                <div className={styles.portolioContainer}>
                  <p>Portfolio mavjud emas</p>
                </div>
              )}
            </div>
          </div>
        </div>
        {message && (
          <Dialog
            isLoading={isLoading}
            ok={isSuccess || isError ? () => router.reload() : undefined}
            setMessage={setMessage}
          >
            {(isLoading || isError || isSuccess) && (
              <DialogStatus
                isPending={isLoading}
                isSuccess={isSuccess}
                isError={isError}
                message={message}
              />
            )}
            {!(isLoading || isError || isSuccess) && (
              <Form
                encType="multipart/form-data"
                handleSubmit={handleSubmit(profileSubmit)}
                title="Profilingizni yangilang"
              >
                <FormInput
                  type="file"
                  accept="image/*"
                  name="image"
                  fieldName="image"
                  register={register}
                />
                <FormInput
                  type="text"
                  defaultValue={data.firstname}
                  name="firstname"
                  fieldName="firstname"
                  register={register}
                />
                <FormInput
                  type="text"
                  defaultValue={data.lastname}
                  name="lastname"
                  fieldName="lastname"
                  register={register}
                />
                <FormInput
                  type="text"
                  defaultValue={data.githubProfile}
                  name="githubProfile"
                  fieldName="githubProfile"
                  register={register}
                />
                <FormInput
                  type="text"
                  defaultValue={data.telegramProfile}
                  name="telegramProfile"
                  fieldName="telegramProfile"
                  register={register}
                />
                <FormInput
                  type="text"
                  defaultValue={data.username}
                  fieldName="username"
                  name="username"
                  register={register}
                />
                <FormInput
                  type="password"
                  fieldName="password"
                  placeholder="parol"
                  name="password"
                  register={register}
                />
                <FormArea
                  defaultValue={data.skills.join(", ")}
                  fieldName="skills"
                  name="skills"
                  register={register}
                />
                <FormArea
                  defaultValue={data.description}
                  fieldName="description"
                  name="description"
                  register={register}
                />

                <FormSubmit>Ha</FormSubmit>
              </Form>
            )}
          </Dialog>
        )}
      </div>
      <Footer />
    </>
  );
};
export default Profile;
