const client = () => {
  const sendMessage = (joinUserInfo) => {
    console.log(
      joinUserInfo.user + "が" + joinUserInfo.channel + "に参加しました"
    );
  };
  return {
    sendMessage,
  };
};

module.exports = client;
