const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("sumit")
    .setDescription(
      "Summarizes the last 100 messages and DMs a summary to you!"
    ),
  async execute(interaction: any) {
    const { getSummary } = require("../openai/summary");
    const { user, channel } = interaction;

    const messages = await channel.messages.fetch({ limit: 100 });

    // Get the content of the messages
    const content = messages
      .map((m: any) => `${m.author.username}: ${m.content}`)
      .join(" \n");
    console.log(content);
    // Get the summary
    const summary = await getSummary(content);
    await user.send(summary);
  },
};
