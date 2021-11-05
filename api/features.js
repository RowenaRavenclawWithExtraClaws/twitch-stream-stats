const { sort, calcMedian, filter, slice } = require("./helpers/utility");

const calcStreamsPerGame = (streamData) => {
  let gameStreamDict = {};

  for (let i = 0; i < streamData.length; i++) {
    if (gameStreamDict[streamData[i].game_id])
      gameStreamDict[streamData[i].game_id].stream_count += 1;
    else
      gameStreamDict[streamData[i].game_id] = {
        game_name: streamData[i].game_name,
        stream_count: 1,
      };
  }

  return Object.values(gameStreamDict);
};

const calcStreamsHighestViewersPerGame = (streamData) => {
  let gameStreamDict = {};

  for (let i = 0; i < streamData.length; i++) {
    if (gameStreamDict[streamData[i].game_id]) {
      if (
        streamData[i].viewer_count >
        gameStreamDict[streamData[i].game_id].viewer_count
      ) {
        gameStreamDict[streamData[i].game_id].game_name =
          streamData[i].game_name;
        gameStreamDict[streamData[i].game_id].stream_title =
          streamData[i].title;
        gameStreamDict[streamData[i].game_id].viewer_count =
          streamData[i].viewer_count;
      }
    } else
      gameStreamDict[streamData[i].game_id] = {
        game_name: streamData[i].game_name,
        stream_title: streamData[i].title,
        viewer_count: streamData[i].viewer_count,
      };
  }

  return Object.values(gameStreamDict);
};

const calcMedianViewers = (streamData) => {
  let viewerCounts = [];
  let median;

  for (let i = 0; i < streamData.length; i++)
    viewerCounts.push({ viewer_count: streamData[i].viewer_count });

  median = calcMedian(viewerCounts);

  return median;
};

const calcStreamsOddViewerCount = (streamData) => {
  let oddStreams = filter(
    streamData,
    (stream) => stream.viewer_count % 2 !== 0
  );

  return oddStreams;
};

const calcStreamsEvenViewerCount = (streamData) => {
  let evenStreams = filter(
    streamData,
    (stream) => stream.viewer_count % 2 === 0
  );

  return evenStreams;
};

const calcStreamsTop100 = (streamData, descending = false) => {
  let streamDataTemp = streamData;

  const compareFuncDescending = (stream1, stream2) =>
    stream1.viewer_count >= stream2.viewer_count;

  const compareFuncAscending = (stream1, stream2) =>
    stream1.viewer_count <= stream2.viewer_count;

  sort(
    streamDataTemp,
    descending ? compareFuncDescending : compareFuncAscending
  );

  return slice(streamDataTemp, 0, 100);
};

const calcStreamsSameViewerCount = (streamData) => {
  let streamDict = {};

  for (let i = 0; i < streamData.length; i++) {
    if (streamDict[streamData[i].viewer_count])
      streamDict[streamData[i].viewer_count].push({
        game_name: streamData[i].game_name,
        stream_title: streamData[i].title,
        viewer_count: streamData[i].viewer_count,
      });
    else
      streamDict[streamData[i].viewer_count] = [
        {
          game_name: streamData[i].game_name,
          stream_title: streamData[i].title,
          viewer_count: streamData[i].viewer_count,
        },
      ];
  }

  let keysArr = Object.keys(streamDict);

  if (keysArr.length === streamData.length) return {};

  for (let i = 0; i < keysArr.length; i++) {
    if (streamDict[keysArr[i]].length === 1) delete streamDict[keysArr[i]];
  }

  return Object.values(streamDict);
};

module.exports.calcStreamsPerGame = calcStreamsPerGame;
module.exports.calcStreamsHighestViewersPerGame =
  calcStreamsHighestViewersPerGame;
module.exports.calcMedianViewers = calcMedianViewers;
module.exports.calcStreamsOddViewerCount = calcStreamsOddViewerCount;
module.exports.calcStreamsEvenViewerCount = calcStreamsEvenViewerCount;
module.exports.calcStreamsTop100 = calcStreamsTop100;
module.exports.calcStreamsSameViewerCount = calcStreamsSameViewerCount;
