import { setStreamsEvenViewers } from "./redux/streamsEvenViewersSlice";
import { setStreamsOddViewers } from "./redux/streamsOddViewersSlice";
import { setStreamsPerGame } from "./redux/streamsPerGameSlice";
import { setStreamsSameViewers } from "./redux/streamsSameViewersSlice";
import { setStreamsTop100 } from "./redux/streamsTop100Slice";
import { setViewersPerGame } from "./redux/viewersPerGameSlice";

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
    `http://localhost:8000/streams/${endpoint}?${stringifyQueryParams(
      queryParams
    )}`
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
