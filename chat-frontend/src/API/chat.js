import {getData, postData} from "./dataFetcher.js";

export async function getChat(user, otherUser) {

  const res = await getData(`/api/chat/${user}/${otherUser}`);

  if (res.status === 200) {

    let chats = [];
    for (const message of res.data) {

      const author = message.author.replace(/\/api\/users\//, "");
      const receiver = message.receiver.replace(/\/api\/users\//, "");

      chats.push({
        id: message.id,
        content: message.content,
        author: author,
        receiver: receiver,
        date: message.date,
      })
    }
    return chats;
  }
  throw res;
}

export async function postChat(user, data) {

  const res = await postData(`/api/chat/${user}/send`, data);

  if (res.status === 201) {
    return res.data;
  }

  console.log(res);
  throw res.error;
}
