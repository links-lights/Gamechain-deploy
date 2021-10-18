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
  const db = await orbitdb.docs("orbit.users", options);
  const db2 = await orbitdb.open(
    "/orbitdb/zdpuAsK8ma37ttpPTP124Kn6VrFPYsaJP2f7h6Ydv4CzZJTda/orbit.users"
  );
  await db2.load();
  db.events.on("peer", (peer) => console.log(peer));

  console.log(db2.get(""));
  return db;
})();
