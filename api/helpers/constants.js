const dotenv = require("dotenv");

dotenv.config();

const twitchAuthInfo = {
  clientId: process.env.CLIENT_ID,
  token: process.env.TOKEN,
  baseUrl: process.env.BASE_URL,
};

const streamsPerPage = 100;
const pageCount = 10;

module.exports.twitchAuthInfo = twitchAuthInfo;
module.exports.streamsPerPage = streamsPerPage;
module.exports.pageCount = pageCount;
