const { SlashCommandBuilder } = require("discord.js");
import { PrismaClient } from "@prisma/client";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Need help with Summify"),
    async execute(interaction: any) {
        await interaction.reply(`

            >(Website)[<https://summify.ai>]
            >(Twitter)[<https://twitter.com/summify_ai>]
        
            **Help**
            >Summify is a Discord bot that summarizes your unread messages in a channel.
            >To use it, simply type \`/summify\` in any channel.

            **Commands**
            >\`/summify\` - Summarize your unread messages in the current channel
            >\`/summify every: 3\` - Summarize your unread messages every **3** hours, or whatever time you set. The available options are 3, 6, 12, or 24.
            >\`/help\` - Get help with Summify
        
        `)
    },
};
