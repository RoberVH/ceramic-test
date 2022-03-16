import useCeramic from "../services/ceramic";

async function updateUser(payload) {
  const [idx, _, did] = await useCeramic();

  await did?.authenticate();

  try {
    await idx.set("basicProfile", payload);
    return payload;
  } catch (err) {
    return err;
  }
}

export default updateUser;
