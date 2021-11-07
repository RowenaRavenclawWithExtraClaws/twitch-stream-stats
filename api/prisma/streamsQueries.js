const { PrismaClient } = require("@prisma/client");
const { webappResultsPerPage } = require("../helpers/constants");
const { calcMedian } = require("../helpers/utility");
const { countRawQueries, selectRawQueries } = require("./rawQueries");

const prisma = new PrismaClient();

const seed = async (streamData) => {
  await prisma.streams.deleteMany({ where: {} });

  try {
    for (let i = 0; i < streamData.length; i++) {
      if (streamData[i].tag_ids === null) streamData[i].tag_ids = undefined;

      await prisma.streams.create({ data: streamData[i] });
    }
  } catch (error) {
    console.log(error);
  }
};

const getStreamsPerGame = async (page) => {
  let result = { data: [], recordCount: 0 };
  const offset = (page - 1) * webappResultsPerPage;

  try {
    result.recordCount = await prisma.$queryRaw`${countRawQueries.perGame}`;

    result.data = await prisma.$queryRaw`${selectRawQueries.perGame(
      webappResultsPerPage,
      offset
    )}`;
  } catch (error) {
    console.log(error);
  } finally {
    return result;
  }
};

const getStreamsHighestViewersPerGame = async (page) => {
  let result = { data: [], recordCount: 0 };
  const offset = (page - 1) * webappResultsPerPage;

  try {
    result.recordCount =
      await prisma.$queryRaw`${countRawQueries.highestViewers}`;

    result.data = await prisma.$queryRaw`${selectRawQueries.highestViewers(
      webappResultsPerPage,
      offset
    )}`;
  } catch (error) {
    console.log(error);
  } finally {
    return result;
  }
};

const getMedianViewerCount = async () => {
  let result = -1;

  try {
    result = calcMedian(
      await prisma.streams.findMany({
        orderBy: { viewer_count: "asc" },
        select: { viewer_count: true },
      })
    );
  } catch (error) {
    console.log(error);
  } finally {
    return result;
  }
};

const getStreamsEvenViewerCount = async (page) => {
  let result = { data: [], recordCount: 0 };
  const offset = (page - 1) * webappResultsPerPage;

  try {
    result.recordCount = await prisma.$queryRaw`${countRawQueries.evenViewers}`;

    result.data = await prisma.$queryRaw`${selectRawQueries.evenViewers(
      webappResultsPerPage,
      offset
    )}`;
  } catch (error) {
    console.log(error);
  } finally {
    return result;
  }
};

const getStreamsOddViewerCount = async (page) => {
  let result = { data: [], recordCount: [] };
  const offset = (page - 1) * webappResultsPerPage;

  try {
    result.recordCount = await prisma.$queryRaw`${countRawQueries.oddViewers}`;

    result.data = await prisma.$queryRaw`${selectRawQueries.oddViewers(
      webappResultsPerPage,
      offset
    )}`;
  } catch (error) {
    console.log(error);
  } finally {
    return result;
  }
};

const getStreamsTop100 = async (page) => {
  let result = { data: [], recordCount: [{ count: 100 }] };
  const offset = (page - 1) * webappResultsPerPage;

  try {
    result.data = await prisma.streams.findMany({
      orderBy: { viewer_count: "desc" },
      select: { title: true, game_name: true, viewer_count: true },
      take: webappResultsPerPage,
      skip: offset,
    });
  } catch (error) {
    console.log(error);
  } finally {
    return result;
  }
};

const getStreamsSameViewers = async (page) => {
  let result = { data: [], recordCount: 0 };
  const offset = (page - 1) * webappResultsPerPage;

  try {
    result.recordCount = await prisma.$queryRaw`${countRawQueries.sameViewers}`;

    result.data = await prisma.$queryRaw`${selectRawQueries.sameViewers(
      webappResultsPerPage,
      offset
    )}`;
  } catch (error) {
    console.log(error);
  } finally {
    return result;
  }
};

module.exports.seed = seed;
module.exports.getStreamsPerGame = getStreamsPerGame;
module.exports.getStreamsHighestViewersPerGame =
  getStreamsHighestViewersPerGame;
module.exports.getStreamsEvenViewerCount = getStreamsEvenViewerCount;
module.exports.getStreamsOddViewerCount = getStreamsOddViewerCount;
module.exports.getMedianViewerCount = getMedianViewerCount;
module.exports.getStreamsTop100 = getStreamsTop100;
module.exports.getStreamsSameViewers = getStreamsSameViewers;
