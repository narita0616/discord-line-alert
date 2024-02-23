const apis = require("./../../common/apis");

const rollGacha = async (client) => {
  const { getGachaImage } = apis();

  await getGachaImage();
};

module.exports = rollGacha;
