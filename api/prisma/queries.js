const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const seed = async (streamData) => {
  await prisma.streams.deleteMany({ where: {} });

  await prisma.streams.count();

  await prisma.streams.createMany({ data: streamData });
};

module.exports.seed = seed;
