import useCeramic, {
  BasicProfile,
  getLegacy3BoxProfileAsBasicProfile,
} from "../services/ceramic";

async function fetch3boxProfile() {
  const [_, address, __] = await useCeramic();

  const profile: BasicProfile = await getLegacy3BoxProfileAsBasicProfile(
    address
  );

  return profile;
}

export default fetch3boxProfile;
