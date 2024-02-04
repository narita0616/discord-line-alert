const sendVCAlert = require("./features/sendVCAlert");
const { messagingApi } = require("@line/bot-sdk");

const line = () => {
  const { MessagingApiClient } = messagingApi;
  const client = new MessagingApiClient({
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  });

  const { sendMessage } = sendVCAlert(client);

  return {
    sendMessage,
  };
};

module.exports = line;
