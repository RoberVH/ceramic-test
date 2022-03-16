import { EthereumAuthProvider, ThreeIdConnect } from "@3id/connect";
import { IDX, getLegacy3BoxProfileAsBasicProfile } from "@ceramicstudio/idx";
import type { BasicProfile } from "@ceramicstudio/idx-constants";

import { CeramicClient } from "@ceramicnetwork/http-client";
import ThreeIdResolver from "@ceramicnetwork/3id-did-resolver";
import KeyDidResolver from "key-did-resolver";

import { DID } from "dids";

const API_URL = "https://ceramic-clay.3boxlabs.com";

declare global {
  interface Window {
    ethereum: any;
  }
}

async function useCeramic() {
  const [address] = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  const ceramic = new CeramicClient(API_URL);
  const idx = new IDX({ ceramic });

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

  return [idx, address, did];
}

export { BasicProfile, getLegacy3BoxProfileAsBasicProfile };

export default useCeramic;
