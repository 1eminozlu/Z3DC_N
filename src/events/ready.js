const { ActivityType } = require("discord.js");
module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    client.user.setActivity("Hello my name is bot!", { type: ActivityType.PLAYING });
  },
};
