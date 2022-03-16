import useCeramic, { BasicProfile } from "../services/ceramic";

async function updateUser(payload: BasicProfile) {
  const [idx, _] = await useCeramic();

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
