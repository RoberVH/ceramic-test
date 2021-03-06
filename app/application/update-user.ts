import useCeramic, { BasicProfile } from "../services/ceramic";

// extend basicProfile
type PayloadType = {
  avatar?: string;
  twitterUrl?: string;
} & BasicProfile;

async function updateUser(payload: PayloadType) {
  const { idx } = await useCeramic();

  try {
    await idx.set("basicProfile", payload);
    console.log(`updateUser`, payload);
    return payload;
  } catch (err) {
    console.log(`updateUser `, err);
    return err;
  }
}

export default updateUser;
