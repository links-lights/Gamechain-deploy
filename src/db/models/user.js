import _db from "../orbit";

export const fetchUsers = async () => {
  const db = await _db;
  // const db = await orbitdb.feed(
  //   "/orbitdb/zdpuAsK8ma37ttpPTP124Kn6VrFPYsaJP2f7h6Ydv4CzZJTda/orbit.users"
  // );
  await db.load();
  const users = db.get("");
  await db.close();
  return users;
};
export const fetchUser = async (account) => {
  const db = await _db;
  // const db = await orbitdb.feed(
  //   "/orbitdb/zdpuAsK8ma37ttpPTP124Kn6VrFPYsaJP2f7h6Ydv4CzZJTda/orbit.users"
  // );
  await db.load();
  const user = await db.get(account);
  await db.close();
  return user;
};
export const changeUser = async (account, username, imageHash, score) => {
  const db = await _db;
  // const db = await orbitdb.feed(
  //   "/orbitdb/zdpuAsK8ma37ttpPTP124Kn6VrFPYsaJP2f7h6Ydv4CzZJTda/orbit.users"
  // );
  await db.load();
  await db.put(
    {
      _id: account,
      username: username,
      imageHash: imageHash,
      score: score,
    },
    { pin: true }
  );
  const user = db.get(account);
  await db.close();
  return user;
};
export const createUser = async (account, username, imageHash, score) => {
  const db = await _db;
  // const db = await orbitdb.feed(
  //   "/orbitdb/zdpuAsK8ma37ttpPTP124Kn6VrFPYsaJP2f7h6Ydv4CzZJTda/orbit.users"
  // );
  await db.load();
  await db.put(
    {
      _id: account,
      username: username,
      imageHash: imageHash,
      score: score,
    },
    { pin: true }
  );
  const user = db.get(account);
  await db.close();
  return user;
};
