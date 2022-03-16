import useCeramic, { BasicProfile } from "../services/ceramic";

async function fetchUser() {
  const [idx, address] = await useCeramic();

  try {
    const profile: BasicProfile = await idx.get(
      "basicProfile",
      `${address}@eip155:1`
    );

    console.log(`fetchUser`, profile);
    return profile;
  } catch (err) {
    console.log(`fetchUser`, err);
  }
}

export default fetchUser;
