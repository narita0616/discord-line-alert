const https = require("https");
const apis = require("../../apis/apis");

const rollGacha = async (req, res) => {
  const { getImageObject } = apis();

  // Lineチャットから送信されたメッセージが"#ガチャ"の場合に処理開始
  if (!(req.body.events[0].type === "message")) return;
  if (!(req.body.events[0].message.text === "#ガチャ")) return;

  // オブジェクトURL, ファイル名を取得
  const s3Object = await getImageObject();

  // 送信メッセージの作成
  const messages = [];
  if (!!s3Object.imageURL) {
    messages.push({
      type: "image",
      originalContentUrl: s3Object.imageURL,
      previewImageUrl: s3Object.imageURL,
    });
  }
  messages.push({
    type: "text",
    text: s3Object.imageName,
  });

  // APIサーバーに送信する応答トークンとメッセージデータを文字列化する
  const dataString = JSON.stringify({
    replyToken: req.body.events[0].replyToken,
    messages: messages,
  });

  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + process.env.LINE_CHANNEL_ACCESS_TOKEN,
  };

  const webhookOptions = {
    hostname: "api.line.me",
    path: "/v2/bot/message/reply",
    method: "POST",
    headers: headers,
    body: dataString,
  };
  // リクエストの定義
  const request = https.request(webhookOptions, (res) => {
    res.on("data", (d) => {
      process.stdout.write(d);
    });
  });

  request.on("error", (err) => {
    console.error(err);
  });

  request.write(dataString);
  request.end();
};

module.exports = rollGacha;
