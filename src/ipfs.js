import * as IPFS from "ipfs";

console.log(process.env, environment);
console.log(window);

const auth =
  "Basic " +
  Buffer.from(
    environment.PROJECT_ID + ":" + environmentv.PROJECT_SECRET
  ).toString("base64");

const ipfsOptions = {
  EXPERIMENTAL: {
    pubsub: true,
  },
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
};

const ipfs = IPFS.create(ipfsOptions);

export default ipfs;
