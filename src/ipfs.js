import * as IPFS from "ipfs";

const ipfsOptions = {
  preload: { enabled: false },
  EXPERIMENTAL: {
    pubsub: true,
  },
  config: {
    Bootstrap: [],
    Addresses: { Swarm: [] },
  },
};

const ipfs = IPFS.create(ipfsOptions);

export default ipfs;
