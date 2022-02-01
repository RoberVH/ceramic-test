import { EthereumAuthProvider, ThreeIdConnect } from "@3id/connect";
import { IDX } from "@ceramicstudio/idx";

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

export type BasicProfile = {
  name: string;
  image: string;
  bio: string;
  emoji: string;
  birthDate: string;
  url: string;
  gender: string;
  homeLocation: string;
  residenceCountry: string;
} | null;

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

    ceramic.setDID(did);

    try {
      await ceramic?.did?.authenticate();
      const a = await idx.set("basicProfile", newUserdata);

      console.log(`save`, a);

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
