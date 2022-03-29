import useCeramic, {
  BasicProfile,
  getLegacy3BoxProfileAsBasicProfile,
} from "../services/ceramic";

async function fetch3boxProfile() {
  const { address } = await useCeramic();

  try {
    const profile: BasicProfile = await getLegacy3BoxProfileAsBasicProfile(
      address
    );

    console.log(`fetch3boxProfile`, profile);
    return profile;
  } catch (err) {
    console.log(`fetchUser`, err);
    return err;
  }
}

export default fetch3boxProfile;
