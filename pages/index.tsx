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
  const dummyUpdate = async () => {
    await updateUser({
      name: "Testing",
      description: "My new description",
      emoji: "🐝",
      birthDate: "1986-02-22",
      url: "www.google.pt",
      gender: "Male",
      residenceCountry: "PT",
      homeLocation: "Porto",
      nationalities: ["RO", "PL"],
      affiliations: ["CCC", "DDD", "EEE"],
    });
  };
  return (
    <div>
      <h1>Ceramic Profile</h1>
      <button onClick={async () => await fetchUser()}>fetchUser</button>
      <button onClick={() => dummyUpdate()}>updateUser</button>
      <button onClick={async () => await fetch3boxProfile()}>
        fetch3boxProfile
      </button>
    </div>
  );
};

export default Index;
