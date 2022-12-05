// Require the necessary discord.js classes
const { Client, Events, Collection, GatewayIntentBits } = require("discord.js");
require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
client.login(process.env.DISCORD_TOKEN);

client.on("ready", (message: any) => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", async (message: any) => {
  if (message.content.startsWith("!ping")) {
    message.reply("Pong!");
  }
  console.log(message.content);
});
