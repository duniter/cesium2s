import {Environment} from "./environment.class";
import {Peer} from "@polkadot/types/interfaces";

export const environment = <Environment>{
  production: true,
  name: 'Cesium2',

  // TODO: use production peers
  defaultPeers: [
    {
      host: 'localhost',
      port: 9944
    }
  ]
};
