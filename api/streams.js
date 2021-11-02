const {
  calcStreamsPerGame,
  calcStreamsHighestViewersPerGame,
  calcMedianViewers,
  calcStreamsOddOrEvenViewerCount,
  calcStreamsTop100,
  calcStreamsSameViewerCount,
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
      break;
    }
  };

  getStreamsPerGame = () => calcStreamsPerGame(this.streamData);

  getStreamsHighestViewersPerGame = () =>
    calcStreamsHighestViewersPerGame(this.streamData);

  medianViewers = () => calcMedianViewers(this.streamData);

  getStreamsOddOrEvenViewerCount = () =>
    calcStreamsOddOrEvenViewerCount(this.streamData);

  getTopStreams = () => calcStreamsTop100(this.streamData, true);

  getStreamsSameViewerCount = () => calcStreamsSameViewerCount(this.streamData);
}

let streams = new Streams();

const populateAndShow = async () => {
  await streams.populateStreamData();

  console.log(streams.getStreamsPerGame());
};

populateAndShow();
