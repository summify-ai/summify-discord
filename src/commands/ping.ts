const { SlashCommandBuilder } = require("discord.js");

async function fetchAllMessages() {
    const channel = client.channels.cache.get("<my-channel-id>");
    let messages: any = [];
  
    // Create message pointer
    let message = await channel.messages
      .fetch({ limit: 1 })
      .then(messagePage => (messagePage.size === 1 ? messagePage.at(0) : null));
  
    while (message) {
      await channel.messages
        .fetch({ limit: 100, before: message.id })
        .then(messagePage => {
          messagePage.forEach(msg => messages.push(msg));
  
          // Update our message pointer to be last message in page of messages
          message = 0 < messagePage.size ? messagePage.at(messagePage.size - 1) : null;
        }
    }
  
    console.log(messages);  // Print all messages
  }

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  async execute(interaction: any) {
    await interaction.reply("Pong!");
  },
};
