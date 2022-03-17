import useCeramic, { BasicProfile } from "../services/ceramic";

type PayloadType = {
  avatar?: string;
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
