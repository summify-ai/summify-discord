const { Client, Events, Collection, GatewayIntentBits } = require("discord.js");
const { getSummary } = require("./openai/summary");
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
  if (message.content.startsWith("!sumit")) {
    // Get the message history of the channel
    const messages = await message.channel.messages.fetch({ limit: 100 });

    // Get the content of the messages
    const content = messages
      .map((m: any) => `${m.author.username}: ${m.content}`)
      .join(" \n");
    console.log(content);
    // Get the summary
    const summary = await getSummary(content);

    // Send the summary
    message.channel.send(summary);
  }
});
