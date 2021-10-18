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

  db.events.on("replicated", (address) => {
    console.log(db.iterator({ limit: -1 }).collect());
  });

  console.log(db.address.toString());
  return db;
})();
