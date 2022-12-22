const { SlashCommandBuilder } = require("discord.js");
const { getSummary } = require("../services/summary");
import { PrismaClient } from "@prisma/client";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("summify")
    .setDescription(
      "DM's you a summary of unread messages in the current channel"
    ),
  async execute(interaction: any) {
    const { user, channel, guild } = interaction;
    const prisma = new PrismaClient();

    const messages = await channel.messages.fetch({ limit: 100 });

    let userAccount = await prisma.user.findFirst({
      where: { discord: { discordId: user.id } },
    });

    if (!userAccount) {
      userAccount = await prisma.user.create({
        data: {
          discord: {
            create: {
              discordId: user.id,
              username: user.username,
            },
          },
        },
      });
    }

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

    const summaryMessage = `***${guild.name}*** in **#${channel.name}**${summary}`;

    await prisma.summary.create({
      data: {
        output: summaryMessage,
        input: content,
        createdBy: {
          connect: {
            id: userAccount.id,
          },
        },
      },
    });

    // Send the summary to the user with channel name and guild name
    await user.send(summaryMessage);
  },
};
