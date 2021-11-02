const {
  calcStreamsPerGame,
  calcStreamsHighestViewersPerGame,
  calcMedianViewers,
  calcStreamsTop100,
  calcStreamsSameViewerCount,
  calcStreamsOddViewerCount,
  calcStreamsEvenViewerCount,
} = require("./features");
const { pageCount } = require("./helpers/constants");
const { requestStreamData, shuffle } = require("./helpers/utility");

class Streams {
  streamData = [];

  populateStreamData = async () => {
    let requestCount = 0;
    let cursor = null;

    while (requestCount < pageCount) {
      const responseInfo = await requestStreamData(cursor);

      this.streamData.push(...shuffle(responseInfo.body));
      cursor = responseInfo.cursor;
      requestCount += 1;
    }
  };

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
