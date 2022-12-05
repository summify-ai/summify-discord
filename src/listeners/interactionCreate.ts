import { BaseCommandInteraction, Client, Interaction } from "discord.js";

export default (client: Client): void => {
  client.on("interactionCreate", async (interaction: Interaction) => {
    if (interaction.isCommand() || interaction.isContextMenu()) {
      await handleSlashCommand(client, interaction);
    }
  });
};

const handleSlashCommand = async (
  client: Client,
  interaction: BaseCommandInteraction
): Promise<void> => {
  // handle slash command here
};
