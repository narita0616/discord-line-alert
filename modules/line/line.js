const sendVCAlert = require("./features/sendVCAlert");
const rollGacha = require("./features/rollGacha");

const { messagingApi } = require("@line/bot-sdk");

const line = () => {
  const { MessagingApiClient } = messagingApi;
  const client = new MessagingApiClient({
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  });

  // メッセージ送信メソッド
  const { sendMessage } = sendVCAlert(client);

  // ガチャメソッド
  rollGacha(client);

  return {
    sendMessage,
  };
};

module.exports = line;
