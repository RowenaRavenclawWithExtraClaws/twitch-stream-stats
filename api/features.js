const { sort, calcMedian, filter } = require("./helpers/utility");

const calcStreamsPerGame = (streamData) => {
  let gameStreamDict = {};

  for (let i = 0; i < streamData.length; i++) {
    if (gameStreamDict[streamData[i].game_id])
      gameStreamDict[streamData[i].game_id].streamCount += 1;
    else
      gameStreamDict[streamData[i].game_id] = {
        gameName: streamData[i].game_name,
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
