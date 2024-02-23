const { discord, line } = require("./modules/index");
require("dotenv").config();

const index = async () => {
  const { sendMessage } = await line();
  discord(sendMessage);
};

index();
