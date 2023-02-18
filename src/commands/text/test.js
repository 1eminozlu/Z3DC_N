module.exports = {
  name: "test",
  aliases: ["test"],
  description: "Test command",
  cooldown: 1000,
  run: async (client, message, args) => {
    message.channel.send("Test commandx");
  },
};
