const { webappResultsPerPage } = require("./constants");
const { slice } = require("./utility");

const endpointHandler = async (req, res, featureFunc) => {
  let result = await featureFunc();

  if (req.query.page) {
    let pageCount = Math.ceil(result.length / webappResultsPerPage);

    result = slice(
      result,
      webappResultsPerPage * (parseInt(req.query.page) - 1),
      webappResultsPerPage * parseInt(req.query.page)
    );

    res.send({ pageCount: pageCount, data: result });
  } else res.send({ data: result });
};

module.exports.endpointHandler = endpointHandler;
