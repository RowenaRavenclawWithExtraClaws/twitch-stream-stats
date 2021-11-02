const restify = require("restify");
const { port } = require("./helpers/constants");
const { endpointHandler } = require("./helpers/endpointHandler");
const { streams } = require("./streams");

const runApp = async () => {
  await streams.populateStreamData();

  const server = restify.createServer({
    name: "top-streams-stats",
    version: "1.0.0",
  });

  server.use(restify.plugins.acceptParser(server.acceptable));
  server.use(restify.plugins.queryParser());
  server.use(restify.plugins.bodyParser());

  server.get("/streams/per-game", (req, res) =>
    endpointHandler(req, res, streams.getStreamsPerGame)
  );

  server.get("/streams/highest-viewers", (req, res) =>
    endpointHandler(req, res, streams.getStreamsHighestViewersPerGame)
  );

  server.get("/streams/median-viewers", (req, res) =>
    endpointHandler(req, res, streams.getMedianViewers)
  );

  server.get("/streams/odd-viewers", (req, res) =>
    endpointHandler(req, res, streams.getStreamsOddViewerCount)
  );

  server.get("/streams/even-viewers", (req, res) =>
    endpointHandler(req, res, streams.getStreamsEvenViewerCount)
  );

  server.get("/streams/top100", (req, res) =>
    endpointHandler(req, res, streams.getTopStreams)
  );

  server.get("/streams/same-viewers", (req, res) =>
    endpointHandler(req, res, streams.getStreamsSameViewerCount)
  );

  server.listen(port, function () {
    console.log(`listening at port ${port}`);
  });
};

runApp();
