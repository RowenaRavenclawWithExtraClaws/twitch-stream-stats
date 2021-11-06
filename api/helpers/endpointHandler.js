const { addUser, getUser } = require("../prisma/queries");
const { webappResultsPerPage } = require("./constants");
const { slice, getHashParams, requestUsername } = require("./utility");

const endpointHandler = async (
  req,
  res,
  databaseFeatureFunc,
  inMemoryFeatureFunc
) => {
  if (req.query.inmemory) executeInMemoryFeature(req, res, inMemoryFeatureFunc);
  else executeDatabaseFeature(req, res, databaseFeatureFunc);
};

const executeDatabaseFeature = async (req, res, databaseFeatureFunc) => {
  let result;

  if (req.query.page) {
    result = await databaseFeatureFunc(parseInt(req.query.page));

    let pageCount = Math.ceil(
      result.recordCount[0].count / webappResultsPerPage
    );

    res.send({ page_count: pageCount, data: result.data });
  } else {
    result = await databaseFeatureFunc();

    res.send({ data: result });
  }
};

const executeInMemoryFeature = async (req, res, inMemoryFeatureFunc) => {
  let result = await inMemoryFeatureFunc();

  if (req.query.page) {
    let pageCount = Math.ceil(result.length / webappResultsPerPage);

    result = slice(
      result,
      webappResultsPerPage * (parseInt(req.query.page) - 1),
      webappResultsPerPage * parseInt(req.query.page)
    );

    res.send({ page_count: pageCount, data: result });
  } else res.send({ data: result });
};

const authHandler = async (req, res) => {
  if (req.query.hash) {
    const result = await resolveWithHash(req.query.hash);

    res.send(201, result);
  } else if (req.query.username) {
    const result = await resolveWithUsername(req.query.username);

    if (result.username.length && result.liveSession)
      res.send({ username: result.username, allow_signin: true });
    else res.send(404, { username: result.username, allow_signin: false });
  } else res.send(400, { message: "bad request" });
};

const resolveWithHash = async (hash) => {
  const hashParams = getHashParams(hash);
  const username = await requestUsername(hashParams.access_token);
  const result = await addUser(username, Date.now());

  return result;
};

const resolveWithUsername = async (username) => {
  const userData = await getUser(username);

  if (userData.username.length) {
    const liveSession = isSessionAlive(userData.session_start);

    return { username: userData.username, liveSession: liveSession };
  } else return { username: userData.username, liveSession: false };
};

module.exports.endpointHandler = endpointHandler;
module.exports.authHandler = authHandler;
