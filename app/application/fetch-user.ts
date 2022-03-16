import useCeramic, { BasicProfile } from "../services/ceramic";

async function ReadUser() {
  const [idx, address, _] = await useCeramic();

  const profile: BasicProfile = await idx.get(
    "basicProfile",
    `${address}@eip155:1`
  );

  return profile;
}

export default ReadUser;
