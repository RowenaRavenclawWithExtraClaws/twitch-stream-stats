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

  getStreamData = () => this.streamData;
}

let streams = new Streams();

const populateAndShow = async () => {
  await streams.populateStreamData();

  // do operations
};
