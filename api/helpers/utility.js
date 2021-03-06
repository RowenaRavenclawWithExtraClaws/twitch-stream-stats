const request = require("request");
const { promisify } = require("util");
const { twitchAuthInfo, streamsPerPage } = require("./constants");

const requestPromise = promisify(request);

// fetch streams data from the Twitch API
const requestStreamData = async (cursor) => {
  const response = await requestPromise(
    `https://${twitchAuthInfo.baseUrl}/streams?first=${streamsPerPage}${
      cursor ? `&after=${cursor}` : ""
    }`,
    {
      headers: {
        "Client-id": twitchAuthInfo.clientId,
      },
      auth: {
        bearer: twitchAuthInfo.token,
      },
    }
  );

  const resBody = JSON.parse(response.body);

  return {
    statusCode: response.statusCode,
    body: resBody.data,
    cursor: resBody.pagination.cursor,
  };
};

// fetch username of current user using the access token provided in the redirect link
const requestUsername = async (accessToken) => {
  const response = await requestPromise(
    `https://${twitchAuthInfo.baseUrl}/users`,
    {
      headers: {
        "Client-id": twitchAuthInfo.clientId,
      },
      auth: {
        bearer: accessToken,
      },
    }
  );

  const body = JSON.parse(response.body);

  const username = body.data[0].login;

  return username;
};

// Fisher-Yates Algorithm
const shuffle = (array) => {
  let randomIndex;
  let currentIndex = array.length - 1;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];

    currentIndex -= 1;
  }

  return array;
};

const merge = (arr, left, middle, right, compareFunc) => {
  let leftLength = middle - left + 1;
  let rightLength = right - middle;
  let Left = new Array(leftLength);
  let Right = new Array(rightLength);
  let i = 0;
  let j = 0;
  let k = left;

  for (let i = 0; i < leftLength; i++) Left[i] = arr[left + i];

  for (let j = 0; j < rightLength; j++) Right[j] = arr[middle + 1 + j];

  while (i < leftLength && j < rightLength) {
    if (compareFunc(Left[i], Right[j])) {
      arr[k] = Left[i];
      i++;
    } else {
      arr[k] = Right[j];
      j++;
    }
    k++;
  }

  while (i < leftLength) {
    arr[k] = Left[i];
    i++;
    k++;
  }

  while (j < rightLength) {
    arr[k] = Right[j];
    j++;
    k++;
  }
};

const mergeSort = (
  arr,
  left,
  right,
  compareFunc = (item1, item2) => item1 <= item2
) => {
  if (left >= right) return;

  let middle = left + parseInt((right - left) / 2);

  mergeSort(arr, left, middle, compareFunc);
  mergeSort(arr, middle + 1, right, compareFunc);

  merge(arr, left, middle, right, compareFunc);
};

const sort = (array, compareFunc) =>
  mergeSort(array, 0, array.length - 1, compareFunc);

const calcMedian = (array) => {
  sort(
    array,
    (stream1, stream2) => stream1.viewer_count < stream2.viewer_count
  );

  const center = array[Math.floor(array.length / 2)].viewer_count;

  if (array.length % 2 === 1) return center;

  return (center + array[Math.floor(array.length / 2) - 1].viewer_count) / 2;
};

const filter = (array, conditionFunc) => {
  let filteredArray = [];

  for (let i = 0; i < array.length; i++) {
    if (conditionFunc(array[i])) filteredArray.push(array[i]);
  }

  return filteredArray;
};

const slice = (array, start, end) => {
  let newArray = [];

  for (let i = start; i < end && i < array.length; i++) {
    newArray.push(array[i]);
  }

  return newArray;
};

const isSessionAlive = (sessionStart) => {
  const timeSpan =
    Math.floor(Date.now() / 1000) - Math.floor(parseFloat(sessionStart) / 1000);

  if (timeSpan < 3600) return true;

  return false;
};

module.exports.requestStreamData = requestStreamData;
module.exports.shuffle = shuffle;
module.exports.calcMedian = calcMedian;
module.exports.filter = filter;
module.exports.sort = sort;
module.exports.slice = slice;
module.exports.requestUsername = requestUsername;
module.exports.isSessionAlive = isSessionAlive;
