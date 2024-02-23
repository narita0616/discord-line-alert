const axios = require("axios");

const apis = () => {
  getGachaImage = async (param) => {
    console.log("getGachaImage");
  };

  return {
    getGachaImage,
  };
};

module.exports = apis;
