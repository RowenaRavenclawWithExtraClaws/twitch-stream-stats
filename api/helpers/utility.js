const request = require("request");
const { promisify } = require("util");
const { twitchAuthInfo, streamsPerPage } = require("./constants");

const requestPromise = promisify(request);

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

  return {
    statusCode: response.statusCode,
    body: JSON.parse(response.body).data,
    cursor: response.cursor,
  };
};

// Fisher-Yates Algorithm
const shuffle = (array) => {
  let randomIndex;
  let currentIndex = array.length;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];

    currentIndex--;
  }

  return array;
};

const partition = (start, end, array) => {
  let pivotIndex = start;
  let pivot = array[pivotIndex];

  while (start < end) {
    while (start < array.length && array[start] <= pivot) start += 1;

    while (array[end] > pivot) end -= 1;

    if (start < end) [array[start], array[end]] = [array[end], array[start]];
  }

  [array[end], array[pivotIndex]] = [array[pivotIndex], array[end]];

  return end;
};

const quickSort = (start, end, array) => {
  if (start < end) {
    let pivot = partition(start, end, array);

    quickSort(start, pivot - 1, array);
    quickSort(pivot + 1, end, array);
  }
};

const sort = (array) => quickSort(0, array.length - 1, array);

const calcMedian = (array) => {
  sort(array);

  const center = array[Math.floor(array.length / 2)];

  if (array.length % 2 === 1) return center;

  return (center + array[Math.floor(array.length / 2) - 1]) / 2;
};

const filter = (array, conditionFunc) => {
  let filteredArray = [];

  for (let i = 0; i < array.length; i++) {
    if (conditionFunc(array[i])) filteredArray.push(array[i]);
  }

  return filteredArray;
};

module.exports.requestStreamData = requestStreamData;
module.exports.shuffle = shuffle;
module.exports.calcMedian = calcMedian;
module.exports.filter = filter;
