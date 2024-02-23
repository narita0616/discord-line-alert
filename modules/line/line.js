const sendVCAlert = require("./features/sendVCAlert");
const rollGacha = require("./features/rollGacha");

const express = require("express");

const { messagingApi } = require("@line/bot-sdk");

const line = async () => {
  // LineBotクライアントの作成
  const { MessagingApiClient } = messagingApi;
  const client = new MessagingApiClient({
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  });

  // HTTP系イベント呼び出し関数
  const { sendMessage } = httpEvents(client);
  // Web Socket系イベント呼び出し関数
  await webSocketEvents(client);

  return {
    sendMessage,
  };
};

// HTTP系イベント集約用関数
const httpEvents = (client) => {
  // メッセージ送信メソッド
  const { sendMessage } = sendVCAlert(client);
  return { sendMessage };
};

// WebSocket系イベント集約用関数
const webSocketEvents = async (client) => {
  // Expressでの通信受付処理
  const app = express();
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.listen(process.env.PORT_NUMBER, () => {
    console.log(`App listening at http://localhost:${process.env.PORT_NUMBER}`);
  });

  // WebSocketイベント追加
  app.post("/webhook", async (req, res) => {
    res.send("HTTP POST request sent to the webhook URL!");
    await rollGacha(req, res);
  });
};

module.exports = line;
