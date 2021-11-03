const { PrismaClient } = require("@prisma/client");
const { calcMedian } = require("../helpers/utility");

const prisma = new PrismaClient();

const seed = async (streamData) => {
  await prisma.streams.deleteMany({ where: {} });

  await prisma.streams.count();

  /*try {
    await prisma.streams.createMany({ data: streamData });
  } catch (error) {
    console.log(error);
  }*/
  let i = 0;

  try {
    for (i = 0; i < streamData.length; i++) {
      if (streamData[i].tag_ids === null) streamData[i].tag_ids = undefined;

      await prisma.streams.create({ data: streamData[i] });
    }
  } catch (error) {
    console.log(error);
    console.log(streamData[i]);
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

    console.log(result);
  } catch (error) {
    console.log(error);
  } finally {
    return result;
  }
};

const getStreamsEvenViewerCount = async () => {
  let result = [];

  try {
    result =
      await prisma.$queryRaw`SELECT * FROM streams.streams WHERE viewer_count % 2 = 0`;
  } catch (error) {
    console.log(error);
  } finally {
    return result;
  }
};

const getStreamsOddViewerCount = async () => {
  let result = [];

  try {
    result =
      await prisma.$queryRaw`SELECT * FROM streams.streams WHERE viewer_count % 2 != 0`;
  } catch (error) {
    console.log(error);
  } finally {
    return result;
  }
};

const getStreamsTop100 = async () => {
  let result = [];

  try {
    result = await prisma.streams.findMany({
      orderBy: { viewer_count: "desc" },
      take: 100,
    });
  } catch (error) {
    console.log(error);
  } finally {
    return result;
  }
};

module.exports.seed = seed;
module.exports.getStreamsEvenViewerCount = getStreamsEvenViewerCount;
module.exports.getStreamsOddViewerCount = getStreamsOddViewerCount;
module.exports.getMedianViewerCount = getMedianViewerCount;
module.exports.getStreamsTop100 = getStreamsTop100;
