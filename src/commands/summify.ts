import { EmbedBuilder } from "discord.js";

const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("summify")
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

    if (process.env.SAVE_MESSAGES === "true") {
      // Save the content to a file
      const fs = require("fs");
      fs.writeFileSync("messages.txt", content);
    }
    await interaction.reply({ content: "Check your DMs ;)", ephemeral: true });

    // Get the summary
    const summary = await getSummary(content);

    const summaryEmbed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle(`${guild.name} : ${channel.name}`)
      .setDescription(summary)
      // .setThumbnail("https://i.imgur.com/VM8Y3MM.gif")
      .setTimestamp();

    // Send the summary to the user with channel name and guild name
    await user.send({ embeds: [summaryEmbed] });
  },
};
