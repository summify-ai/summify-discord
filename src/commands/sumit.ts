const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("sumit")
    .setDescription(
      "DM's you a summary of unread messages in the current channel"
    ),
  async execute(interaction: any) {
    const { getSummary } = require("../services/summary");
    const { user, channel, guild } = interaction;

    const messages = await channel.messages.fetch({ limit: 100 });

    // Get the content of the messages
    const content = messages
      .map((m: any) => `${m.author.username}: ${m.content}`)
      .join(" \n");
    console.log(content);

    // Get the summary
    const summary = await getSummary(content);
    // Send the summary to the user with channel name and guild name
    await user.send(`Summary for your unread messages from **#${channel.name}** in **${guild.name}:**\n${summary}`);
  },
};
