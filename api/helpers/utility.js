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

module.exports.requestStreamData = requestStreamData;
module.exports.shuffle = shuffle;
