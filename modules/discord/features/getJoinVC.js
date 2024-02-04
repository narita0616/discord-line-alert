const getJoinVC = (client, sendLineMessage) => {
  client.on("voiceStateUpdate", (oldState, newState) => {
    (async () => {
      // ユーザーがボイスチャンネルを退出
      if (!!oldState.channelId && newState.channelId === null) return;

      // ミュート等の状態変化
      if (oldState.channelId === newState.channelId) return;

      // ボットが参加しているサーバー情報を取得
      const guild = newState.guild;

      let res;
      try {
        res = await guild.channels.fetch(newState.channelId);
      } catch {
        console.log(
          "error: チャンネルへ参加しているユーザーを正しく取得できませんでした"
        );
        return;
      }

      // 参加したボイスチャット内の人数
      const members = res.members;

      // 既にメンバーが通話に参加している場合
      if (members.size != 1) return;

      const joinUserInfo = {
        user: newState.member.user.globalName,
        channel: newState.channel.name,
      };
      sendLineMessage(joinUserInfo);
    })();
  });
};

module.exports = getJoinVC;
