const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

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

module.exports.addUser = addUser;
module.exports.getUser = getUser;
module.exports.deleteUser = deleteUser;
