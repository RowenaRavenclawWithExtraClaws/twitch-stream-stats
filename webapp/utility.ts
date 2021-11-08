import { setStreamsEvenViewers } from "./redux/streamsEvenViewersSlice";
import { setStreamsOddViewers } from "./redux/streamsOddViewersSlice";
import { setStreamsPerGame } from "./redux/streamsPerGameSlice";
import { setStreamsSameViewers } from "./redux/streamsSameViewersSlice";
import { setStreamsTop100 } from "./redux/streamsTop100Slice";
import { setUsername } from "./redux/usernameSlice";
import { setViewersPerGame } from "./redux/viewersPerGameSlice";

const apiBaseUrl = "https://twitch-stream-stats.herokuapp.com/";

export const endpoints = [
  { endpoint: "per-game", setter: setStreamsPerGame },
  { endpoint: "highest-viewers", setter: setViewersPerGame },
  { endpoint: "odd-viewers", setter: setStreamsOddViewers },
  { endpoint: "even-viewers", setter: setStreamsEvenViewers },
  { endpoint: "same-viewers", setter: setStreamsSameViewers },
  { endpoint: "top100", setter: setStreamsTop100 },
];

export const customFetch = (
  endpoint: string,
  queryParams: object,
  dispatcher: (body: number | object) => void
) =>
  fetch(
    `${apiBaseUrl}streams/${endpoint}?${stringifyQueryParams(queryParams)}`
  ).then((res) => res.json().then((body) => dispatcher(body)));

const stringifyQueryParams = (queryParams: any) => {
  let queryString = "";

  Object.keys(queryParams).forEach((param) => {
    if (queryString.length)
      queryString = `${queryString}&${param}=${queryParams[param]}`;
    else queryString = `${queryString}${param}=${queryParams[param]}`;
  });

  return queryString;
};

// auth user using access token in the hash or username
export const isAuthUser = async (hash: string, dispatch: any) => {
  const username = localStorage.getItem("username");

  if (username) {
    return await resolveWithUsername(username, dispatch);
  } else if (hash.length) {
    return await resolveWithHash(hash, dispatch);
  }

  return false;
};

const resolveWithUsername = async (username: string, dispatch: any) => {
  const response = await fetch(`${apiBaseUrl}users/auth?username=${username}`);

  if (response.status === 404) return false;

  const body = await response.json();

  localStorage.setItem("username", body.username);
  dispatch(setUsername(body.username));

  return true;
};

const resolveWithHash = async (hash: string, dispatch: any) => {
  const accessToken = getHashParams(hash).access_token;

  const response = await fetch(
    `${apiBaseUrl}users/auth?access_token=${accessToken}`
  );

  const body = await response.json();

  localStorage.setItem("username", body.username);
  dispatch(setUsername(body.username));

  return true;
};

// parse hash string into an object
const getHashParams = (hash: string) => {
  type HashParam = {
    [key: string]: string;
  };

  let hashParams: HashParam = {};

  let e,
    a = /\+/g,
    r = /([^&;=]+)=?([^&;]*)/g,
    q = hash.substring(1);

  const d = (s: string) => {
    return decodeURIComponent(s.replace(a, " "));
  };

  while ((e = r.exec(q))) hashParams[d(e[1])] = d(e[2]);

  return hashParams;
};

// convert API data keys to more human-readable format (stream_count => Stream count)
export const unslugify = (word: string) => {
  let newWord = word[0].toUpperCase();

  for (let i = 1; i < word.length; i++) {
    if (word[i] === "_") newWord = `${newWord} `;
    else newWord = `${newWord}${word[i]}`;
  }

  return newWord;
};

export const logUserOut = async (username: string) => {
  await fetch(`${apiBaseUrl}users/logout?username=${username}`);
};
