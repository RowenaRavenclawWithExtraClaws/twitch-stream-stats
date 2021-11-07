const {
  calcStreamsPerGame,
  calcStreamsHighestViewersPerGame,
  calcMedianViewers,
  calcStreamsTop100,
  calcStreamsSameViewerCount,
  calcStreamsOddViewerCount,
  calcStreamsEvenViewerCount,
} = require("./inMemory/features");
const { pageCount } = require("./helpers/constants");
const { requestStreamData, shuffle } = require("./helpers/utility");

class Streams {
  streamData = [];

  // fetch data from twitch API and store it in memory
  populateStreamData = async () => {
    let requestCount = 0;
    let cursor = null;

    this.streamData = [];

    while (requestCount < pageCount) {
      const responseInfo = await requestStreamData(cursor);

      this.streamData.push(...responseInfo.body);
      cursor = responseInfo.cursor;
      requestCount += 1;
    }

    this.streamData = shuffle(this.streamData);
  };

  // All in-memory features
  getStreamData = () => this.streamData;

  getStreamsPerGame = () => calcStreamsPerGame(this.streamData);

  getStreamsHighestViewersPerGame = () =>
    calcStreamsHighestViewersPerGame(this.streamData);

  getMedianViewers = () => calcMedianViewers(this.streamData);

  getStreamsOddViewerCount = () => calcStreamsOddViewerCount(this.streamData);

  getStreamsEvenViewerCount = () => calcStreamsEvenViewerCount(this.streamData);

  getTopStreams = () => calcStreamsTop100(this.streamData, true);

  getStreamsSameViewerCount = () => calcStreamsSameViewerCount(this.streamData);
}

let streams = new Streams();

module.exports.streams = streams;
