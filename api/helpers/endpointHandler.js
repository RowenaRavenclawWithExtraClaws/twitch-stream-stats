const { webappResultsPerPage } = require("./constants");
const { slice } = require("./utility");

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

module.exports.endpointHandler = endpointHandler;
