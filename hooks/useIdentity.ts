import { EthereumAuthProvider, ThreeIdConnect } from "@3id/connect";
import { IDX, getLegacy3BoxProfileAsBasicProfile } from "@ceramicstudio/idx";
import type { BasicProfile } from "@ceramicstudio/idx-constants";

import { CeramicClient } from "@ceramicnetwork/http-client";
import ThreeIdResolver from "@ceramicnetwork/3id-did-resolver";
import KeyDidResolver from "key-did-resolver";

import { DID } from "dids";
import { useState } from "react";

const API_URL = "https://ceramic-clay.3boxlabs.com";

declare global {
  interface Window {
    ethereum: any;
  }
}

const useIdentity = () => {
  const [profile, setProfile] = useState<BasicProfile>(null);
  const [loading, setLoading] = useState({
    read: false,
    write: false,
  });
  const [error, setError] = useState({
    read: false,
    write: false,
  });

  async function connect() {
    const addresses = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    return addresses;
  }

  const read3boxProfile = async () => {
    const [address] = await connect();

    const profile = getLegacy3BoxProfileAsBasicProfile(address);

    console.log(profile);
  };

  const read = async (): Promise<{
    error?: any;
    data?: BasicProfile;
  }> => {
    const [address] = await connect();
    const ceramic = new CeramicClient(API_URL);
    const idx = new IDX({ ceramic });

    setLoading({ ...loading, read: true });

    try {
      const data: BasicProfile = await idx.get(
        "basicProfile",
        `${address}@eip155:1`
      );

      console.log(`READ PROFILE`, data);

      setLoading({ ...loading, read: false });
      setError({ ...error, read: false });

      setProfile(data);

      return {
        data,
      };
    } catch (err) {
      setProfile(null);

      const { error, data } = await write({
        name: address,
      });

      return {
        error,
        data,
      };
    }
  };

  const write = async (
    newUserdata: any
  ): Promise<{
    error?: any;
    data?: BasicProfile;
  }> => {
    const [address] = await connect();
    const ceramic = new CeramicClient(API_URL);
    const idx = new IDX({ ceramic });

    setLoading({ ...loading, write: true });

    const threeIdConnect = new ThreeIdConnect();
    const provider = new EthereumAuthProvider(window.ethereum, address);

    await threeIdConnect.connect(provider);

    const did = new DID({
      provider: await threeIdConnect.getDidProvider(),
      resolver: {
        ...KeyDidResolver.getResolver(),
        ...ThreeIdResolver.getResolver(ceramic),
      },
    });

    try {
      ceramic.setDID(did);

      const auth = await did?.authenticate();
      const a = await idx.set("basicProfile", newUserdata);

      console.log(`SET AUTH`, auth);
      console.log(`SET SAVE`, a, newUserdata);

      setLoading({ ...loading, write: false });
      setError({ ...error, write: false });

      setProfile(newUserdata);

      return {
        data: newUserdata,
      };
    } catch (err) {
      setLoading({ ...loading, write: false });
      setError({ ...error, read: true });

      setProfile(null);

      return {
        error: err,
        data: null,
      };
    }
  };

  return {
    loading,
    profile,
    error,
    read,
    write,
  };
};

export default useIdentity;
