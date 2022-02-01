import Head from "next/head";

import styles from "../styles/Home.module.css";
import useIdentity from "../hooks/useIdentity";
import { useState } from "react";

const Home = () => {
  const { loading, profile, error, read, write } = useIdentity();
  const [profileData, setProfileData] = useState<any>(null);

  const readProfile = async () => {
    const { error, data } = await read();
    if (error === undefined) {
      setProfileData(data);
    }
  };

  const updateProfile = async () => {
    const { error, data } = await write(profileData);
    if (error === undefined) {
      setProfileData(data);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <div className={styles.wrapper}>
          <button className={styles.button} onClick={readProfile}>
            Read Profile
          </button>

          {loading.read && <p className={styles.description}>Reading...</p>}
          {loading.write && <p className={styles.description}>Updating...</p>}

          <p className={styles.description}>ERROR: {JSON.stringify(error)}</p>

          {profile !== null && (
            <div className={styles.form}>
              <div className={styles.field}>
                <label htmlFor="">Name</label>
                <input
                  type="text"
                  value={profileData?.name}
                  onChange={(e) =>
                    setProfileData({ ...profileData, name: e.target.value })
                  }
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="">Bio</label>
                <input
                  type="text"
                  value={profileData?.bio}
                  onChange={(e) =>
                    setProfileData({ ...profileData, bio: e.target.value })
                  }
                />
              </div>
              <button className={styles.button} onClick={updateProfile}>
                Update Profile
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
