import {postData} from "./dataFetcher.js";

export async function login(email, password) {
  const res = await postData("/api/login", {
    email: email,
    password: password
  });
  if (res.status === 200) {
    return res.data;
  }
  throw res;
}

export async function register(email, username, password) {
  const res = await postData("/api/register", {
    email: email,
    username: username,
    password: password
  });
  if (res.status === 201) {
    return res.data;
  }
  throw res;
}

export async function updateUser(id, username, password) {
  const res = await postData(`/api/update/${id}`, {
    username: username,
    password: password
  });
  if (res.status === 200) {
    return res.data;
  }
  throw res;
}

export function getUserId() {
  return localStorage.getItem('userId');
}

export function getUserName() {
  return localStorage.getItem('userName');
}

export function writeUserId(userId) {
  localStorage.setItem('userId', userId);
}

export function writeUserName(userName) {
  localStorage.setItem('userName', userName);
}

// remove userId from localStorage
export function removeUserId() {
  localStorage.removeItem('userId');
}

export function removeUserName() {
  localStorage.removeItem('userName');
}
