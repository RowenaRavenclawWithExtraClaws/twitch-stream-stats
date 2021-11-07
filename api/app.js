const restify = require("restify");
const cron = require("node-cron");
const cors = require("cors");
const { port } = require("./helpers/constants");
const {
  endpointHandler,
  authHandler,
  logoutHandler,
} = require("./helpers/endpointHandler");
const { streams } = require("./streams");
const {
  seed,
  getMedianViewerCount,
  getStreamsOddViewerCount,
  getStreamsEvenViewerCount,
  getStreamsTop100,
  getStreamsPerGame,
  getStreamsHighestViewersPerGame,
  getStreamsSameViewers,
} = require("./prisma/streamsQueries");

const runApp = async () => {
  // fetch data from twitch API and seed the database
  await streams.populateStreamData();
  await seed(streams.getStreamData());

  // cron job to update the data every 15 minutes
  cron.schedule("15 * * * * ", async () => {
    await streams.populateStreamData();
    await seed(streams.getStreamData());
  });

  const server = restify.createServer({
    name: "top-streams-stats",
    version: "1.0.0",
  });

  // middlewares
  server.use(cors());
  server.use(restify.plugins.acceptParser(server.acceptable));
  server.use(restify.plugins.queryParser());
  server.use(restify.plugins.bodyParser());

  // endpoints
  server.get("/users/auth", (req, res) => authHandler(req, res));

  server.get("/users/logout", (req, res) => logoutHandler(req, res));

  server.get("/streams/per-game", (req, res) =>
    endpointHandler(req, res, getStreamsPerGame, streams.getStreamsPerGame)
  );

  server.get("/streams/highest-viewers", (req, res) =>
    endpointHandler(
      req,
      res,
      getStreamsHighestViewersPerGame,
      streams.getStreamsHighestViewersPerGame
    )
  );

  server.get("/streams/median-viewers", (req, res) =>
    endpointHandler(req, res, getMedianViewerCount, streams.getMedianViewers)
  );

  server.get("/streams/odd-viewers", (req, res) =>
    endpointHandler(
      req,
      res,
      getStreamsOddViewerCount,
      streams.getStreamsOddViewerCount
    )
  );

  server.get("/streams/even-viewers", (req, res) =>
    endpointHandler(
      req,
      res,
      getStreamsEvenViewerCount,
      streams.getStreamsEvenViewerCount
    )
  );

  server.get("/streams/top100", (req, res) =>
    endpointHandler(req, res, getStreamsTop100, streams.getTopStreams)
  );

  server.get("/streams/same-viewers", (req, res) =>
    endpointHandler(
      req,
      res,
      getStreamsSameViewers,
      streams.getStreamsSameViewerCount
    )
  );

  // start server
  server.listen(port, function () {
    console.log(`listening at port ${port}`);
  });
};

runApp();
