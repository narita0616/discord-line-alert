const getJoinVC = require("./features/getJoinVC");
require("dotenv").config();

const { Client, Events, GatewayIntentBits } = require("discord.js");

const discord = (sendLineMessage) => {
  const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
  });

  // discord bot起動
  client.once(Events.ClientReady, (readyClient) => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
  });

  // discord botへ機能追加
  getJoinVC(client, sendLineMessage);

  // discord botログイン
  client.login(process.env.DISCORD_TOKEN);
};

module.exports = discord;
