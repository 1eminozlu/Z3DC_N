const { ActivityType } = require("discord.js");
module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    console.log(`${client.user.tag} is online!`);
    client.user.setActivity("Hello my name is bot!", { type: ActivityType.PLAYING });
  },
};
