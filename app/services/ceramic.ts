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
    ceramic: CeramicClient;
    idx: IDX;
  }
}

async function useCeramic() {
  if (window.ethereum == null) {
    throw new Error("No injected Ethereum provider");
  }

  const [address] = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  console.log(`Adress ${address}`);

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

  await did?.authenticate();

  return { ceramic, idx, address };
}

export { BasicProfile, getLegacy3BoxProfileAsBasicProfile };

export default useCeramic;
