const { PrismaClient } = require("@prisma/client");
const { webappResultsPerPage } = require("../helpers/constants");
const { calcMedian } = require("../helpers/utility");

const prisma = new PrismaClient();

const seed = async (streamData) => {
  await prisma.streams.deleteMany({ where: {} });

  try {
    await prisma.streams.createMany({ data: streamData });
  } catch (error) {
    console.log(error);
  }

  /*let i = 0;

  try {
    for (i = 0; i < streamData.length; i++) {
      if (streamData[i].tag_ids === null) streamData[i].tag_ids = undefined;

      await prisma.streams.create({ data: streamData[i] });
    }
  } catch (error) {
    console.log(error);
    console.log(streamData[i]);
  }*/
};

const addUser = async (username, timeStamp) => {
  try {
    await prisma.users.create({
      data: {
        username: username,
        session_start: timeStamp,
      },
    });
  } catch (error) {
    console.log(error);
  } finally {
    return { username: username };
  }
};

const getUser = async (username) => {
  let userData;

  try {
    userData = await prisma.users.findUnique({
      where: {
        username: username,
      },
    });
  } catch (error) {
    console.log(error);
  } finally {
    return userData;
  }
};

const deleteUser = async (username) => {
  try {
    await prisma.users.delete({
      where: {
        username: username,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const getStreamsPerGame = async (page) => {
  let result = { data: [], recordCount: 0 };
  const offset = (page - 1) * webappResultsPerPage;

  try {
    result.recordCount = await prisma.$queryRaw`SELECT COUNT (*) FROM 
                             (SELECT COUNT (*) FROM streams.streams 
                             GROUP BY game_id) AS streamspergame;`;

    result.data =
      await prisma.$queryRaw`SELECT game_name, COUNT(*) as stream_count FROM streams.streams
                             GROUP BY game_id, game_name
                             limit ${webappResultsPerPage} offset ${offset}`;
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
    result.recordCount = await prisma.$queryRaw`SELECT COUNT(*) FROM
    (SELECT game_name, title, temp.viewer_count FROM streams.streams temp INNER JOIN
    (SELECT game_id, MAX(viewer_count) as viewer_count FROM streams.streams group by game_id) AS lookup
    ON lookup.game_id = temp.game_id AND lookup.viewer_count = temp.viewer_count) AS record_count;`;

    result.data =
      await prisma.$queryRaw`SELECT game_name, title, temp.viewer_count FROM streams.streams temp INNER JOIN
      (SELECT game_id, MAX(viewer_count) as viewer_count FROM streams.streams group by game_id) AS lookup
      ON lookup.game_id = temp.game_id AND lookup.viewer_count = temp.viewer_count
      limit ${webappResultsPerPage} offset ${offset}`;
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
    result.recordCount =
      await prisma.$queryRaw`SELECT COUNT(*) FROM streams.streams WHERE viewer_count % 2 = 0`;

    result.data =
      await prisma.$queryRaw`SELECT title, game_name, viewer_count FROM streams.streams WHERE viewer_count % 2 = 0
                             limit ${webappResultsPerPage} offset ${offset}`;
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
    result.recordCount =
      await prisma.$queryRaw`SELECT COUNT(*) FROM streams.streams WHERE viewer_count % 2 != 0`;

    result.data =
      await prisma.$queryRaw`SELECT title, game_name, viewer_count FROM streams.streams WHERE viewer_count % 2 != 0
                             limit ${webappResultsPerPage} offset ${offset}`;
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
    result.recordCount = await prisma.$queryRaw`SELECT COUNT(*) FROM
      (SELECT temp.game_name, temp.title, lookup.title, temp.viewer_count FROM streams.streams AS temp INNER JOIN
      (SELECT id, viewer_count, title FROM streams.streams) AS lookup
      ON lookup.id <> temp.id AND lookup.viewer_count = temp.viewer_count) AS record_count;`;

    result.data =
      await prisma.$queryRaw`SELECT temp.game_name, temp.title AS stream_title1, lookup.title AS stream_title2, temp.viewer_count FROM streams.streams AS temp INNER JOIN
      (SELECT id, viewer_count, title FROM streams.streams) AS lookup
      ON lookup.id <> temp.id AND lookup.viewer_count = temp.viewer_count
      limit ${webappResultsPerPage} offset ${offset}`;
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
module.exports.addUser = addUser;
module.exports.getUser = getUser;
module.exports.deleteUser = deleteUser;
