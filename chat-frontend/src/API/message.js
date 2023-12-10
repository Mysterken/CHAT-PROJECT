import {getData, postData} from "./dataFetcher.js";

export async function getMessages(author, receiver) {
  const res = await getData(`/api/messages?author.id=${author}&receiver.id=${receiver}`);
  if (res.status === 200) {
    let messages = [];
    for (const message of res.data["hydra:member"]) {
      messages.push({
        id: message.id,
        content: message.content,
        author: message.author,
        receiver: message.receiver,
        date: message.date,
      })
    }
    return messages;
  }
  return res;
}

export async function postMessage(data) {

  const res = await postData("/api/messages", data);
  if (res.status === 201) {
    return res.data;
  }
  return res;
}
