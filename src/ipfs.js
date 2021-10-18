import * as IPFS from "ipfs";

console.log(process.env);
console.log(window);

const PROJECT_ID = "1zh41fxyr27yuVrJ8wQirctUJGx";
const PROJECT_SECRET = "917a314e9e48fed847f60e0096f84d0a";

const auth =
  "Basic " + Buffer.from(PROJECT_ID + ":" + PROJECT_SECRET).toString("base64");

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
