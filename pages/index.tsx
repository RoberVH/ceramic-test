import React from "react";
import fetchUser from "../app/application/fetch-user";
import fetch3boxProfile from "../app/application/fetch-3box-profile";
import updateUser from "../app/application/update-user";

// name?: string;
// image?: ImageSources;
// description?: string;
// emoji?: string;
// background?: ImageSources;
// birthDate?: string;
// url?: string;
// gender?: string;
// homeLocation?: string;
// residenceCountry?: string;
// nationalities?: Array<string>;
// affiliations?: Array<string>;

const Index = () => {
  const [image, setImage] = React.useState(null);
  const [profile, setProfile] = React.useState(null);

  const dummyUpdate = async () => {
    await updateUser({
      name: "Tiago",
      description: "My new description",
      emoji: "🐝",
      birthDate: "1986-02-22",
      url: "https://twitter.com/TiagoMoutinho12",
      gender: "Male",
      residenceCountry: "PT",
      homeLocation: "Porto",
      nationalities: ["RO", "PL"],
      affiliations: ["CCC", "DDD", "EEE"],
      avatar: image,
    });

    setProfile(null);
  };

  const dummyRead = async () => {
    const result = await fetchUser();
    setProfile(result);
  };

  return (
    <div
      style={{
        padding: "15px",
      }}
    >
      <h1>Ceramic Profile</h1>

      <div
        style={{
          marginBottom: "20px",
        }}
      >
        <h4>Set Image dummy to update</h4>
        <input
          type="text"
          onChange={({ target: { value } }) => setImage(value)}
        />
      </div>

      {profile ? (
        <div
          style={{
            marginBottom: "20px",
          }}
        >
          <img src={profile.avatar} alt="" height="100px" />
          <h4>
            {profile.name} <small>{profile.emoji}</small>
          </h4>
          <p>{profile.description}</p>
          <p>{profile.url}</p>
        </div>
      ) : null}

      <button onClick={async () => dummyRead()}>fetchUser</button>
      <button onClick={() => dummyUpdate()}>updateUser</button>
      <button onClick={async () => await fetch3boxProfile()}>
        fetch3boxProfile
      </button>
    </div>
  );
};

export default Index;
