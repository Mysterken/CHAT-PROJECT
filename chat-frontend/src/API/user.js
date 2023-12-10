import {getData} from "./dataFetcher.js";

export async function getUsers() {
  const res = await getData("/api/users");
  if (res.status === 200) {
    let users = [];
    for (const user of res.data["hydra:member"]) {
        users.push({
            id: user.id,
            username: user.username,
            email: user.email,
            roles: user.roles,
        })
    }
    return users;
  }
  throw res;
}
