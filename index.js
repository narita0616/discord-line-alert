const { discord, line } = require("./modules/index");

const { sendMessage } = line();
discord(sendMessage);
