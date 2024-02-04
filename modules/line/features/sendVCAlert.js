const sendVCAlert = (client) => {
  const sendMessage = (joinUserInfo) => {
    const message = [
      {
        type: "text",
        text:
          joinUserInfo.user + "が" + joinUserInfo.channel + "に参加しました",
      },
    ];

    client.pushMessage({
      to: process.env.LINE_GROUP_ID,
      messages: message,
    });
  };
  return {
    sendMessage,
  };
};

module.exports = sendVCAlert;
