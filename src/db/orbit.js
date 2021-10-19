import ipfs from "../ipfs";
import OrbitDB from "orbit-db";

export default (async function Orbitdb() {
  const _ipfs = await ipfs;
  const orbitdb = await OrbitDB.createInstance(_ipfs);
  const options = {
    create: true,
    accessController: {
      write: ["*"],
    },
  };
  let db;
  // try {
  //   console.log("hell yeah");
  db = await orbitdb.open(
    "/orbitdb/zdpuAryTMHxhHjXtJ7hzkit1jMGXS21rLD2mSeo7PFJQEkaNF/orbit-users"
  );
  // } catch (error) {
  // db = await orbitdb.docs("orbit-users", options);
  console.log(db.address.toString());
  // }
  await db.load();
  db.events.on("peer", (peer) => console.log(peer));

  return db;
})();
