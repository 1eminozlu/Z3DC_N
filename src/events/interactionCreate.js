const { InteractionType } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  execute: async (interaction) => {
    let client = interaction.client;
    if (interaction.type == InteractionType.ApplicationCommand) {
      if (interaction.user.bot) return;
      try {
        const command = client.slashCommands.get(interaction.commandName);
        command.run(client, interaction);
      } catch {
        // console.error(error);
        interaction.reply("There was an error trying to execute that command!");
      }
    }
  },
};
