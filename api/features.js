const { sort, calcMedian, filter } = require("./helpers/utility");

const calcStreamsPerGame = (streamData) => {
  let gameStreamDict = {};

  for (let i = 0; i < streamData.length; i++) {
    if (gameStreamDict[streamData[i].game_id])
      gameStreamDict[streamData[i].game_id].streamCount += 1;
    else
      gameStreamDict[streamData[i].game_id] = {
        gameName: streamData[i].game_name,
        streamTitle: streamData[i].title,
        streamCount: 1,
      };
  }

  return gameStreamDict;
};

const calcStreamsHighestViewersPerGame = (streamData) => {
  let gameStreamDict = {};

  for (let i = 0; i < streamData.length; i++) {
    if (gameStreamDict[streamData[i].game_id]) {
      if (
        streamData[i].viewer_count >
        gameStreamDict[streamData[i].game_id].viewerCount
      ) {
        gameStreamDict[streamData[i].game_id].gameName =
          streamData[i].game_name;
        gameStreamDict[streamData[i].game_id].streamTitle = streamData[i].title;
        gameStreamDict[streamData[i].game_id].viewerCount =
          streamData[i].viewer_count;
      }
    } else
      gameStreamDict[streamData[i].game_id] = {
        gameName: streamData[i].game_name,
        streamTitle: streamData[i].title,
        viewerCount: streamData[i].viewer_count,
      };
  }

  return gameStreamDict;
};

const calcMedianViewers = (streamData) => {
  let viewerCounts = [];
  let median;

  for (let i = 0; i < streamData.length; i++)
    viewerCounts.push(streamData[i].viewer_count);

  median = calcMedian(viewerCounts);

  return median;
};

const calcStreamsOddOrEvenViewerCount = (streamData) => {
  let oddStreams = filter(
    streamData,
    (stream) => stream.viewer_count % 2 !== 0
  );
  let evenStreams = filter(
    streamData,
    (stream) => stream.viewer_count % 2 === 0
  );

  return { oddStreams: oddStreams, evenStreams: evenStreams };
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

  return streamDataTemp.slice(0, 100);
};

const calcStreamsSameViewerCount = (streamData) => {
  let streamDict = {};

  for (let i = 0; i < streamData.length; i++) {
    if (streamDict[streamData[i].viewer_count])
      streamDict[streamData[i].viewer_count].push({
        gameName: streamData[i].game_name,
        streamTitle: streamData[i].title,
        viewerCount: streamData[i].viewer_count,
      });
    else
      streamDict[streamData[i].viewer_count] = {
        gameName: streamData[i].game_name,
        streamTitle: streamData[i].title,
        viewerCount: streamData[i].viewer_count,
      };
  }

  let keysArr = Object.keys(streamDict);

  if (keysArr.length === streamData.length) return {};

  for (let i = 0; i < keysArr.length; i++) {
    if (streamDict[keysArr[i]].length === 1) delete streamDict[keysArr[i]];
  }

  return streamDict;
};

module.exports.calcStreamsPerGame = calcStreamsPerGame;
module.exports.calcStreamsHighestViewersPerGame =
  calcStreamsHighestViewersPerGame;
module.exports.calcMedianViewers = calcMedianViewers;
module.exports.calcStreamsOddOrEvenViewerCount =
  calcStreamsOddOrEvenViewerCount;
module.exports.calcStreamsTop100 = calcStreamsTop100;
module.exports.calcStreamsSameViewerCount = calcStreamsSameViewerCount;
