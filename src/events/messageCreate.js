const { Collection } = require("discord.js");
const ms = require("ms");
const cooldowns = new Collection();

const prefix = process.env.PREFIX;

module.exports = {
  name: "messageCreate",
  execute: async (message) => {
    let client = message.client;
    if (message.author.bot) return;
    if (message.channel.type === "DM") return;
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const cmd = args.shift().toLowerCase();
    if (cmd.length === 0) return;
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) {
      if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Collection());
      }
      const now = Date.now();
      const timestamps = cooldowns.get(command.name);
      const cooldownAmount = (command.cooldown || 3) * 1000;
      if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
        if (now < expirationTime) {
          const timeLeft = (expirationTime - now) / 1000;
          return message.reply(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
        }
      }
      timestamps.set(message.author.id, now);
      setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
      try {
        command.run(client, message, args);
      } catch (error) {
        console.error(error);
        message.reply("There was an error trying to execute that command!");
      }
    }
  },
};
