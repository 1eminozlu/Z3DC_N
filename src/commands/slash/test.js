const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

const operation = async (client, interaction) => {
  const embed = new EmbedBuilder().setTitle("Test command").setDescription("Test command").setColor("BLUE").setTimestamp();
  interaction.reply({ embeds: [embed] });
};

module.exports = {
  data: new SlashCommandBuilder().setName("test").setDescription("Test command"),
  run: operation,
};
