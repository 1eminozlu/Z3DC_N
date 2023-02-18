//Main Requirements
const { Client, Collection, GatewayIntentBits, Partials } = require("discord.js");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const intents = {
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.MessageContent,
  ],
  shards: "auto",
  partials: [Partials.Message, Partials.Channel, Partials.GuildMember, Partials.Reaction, Partials.GuildScheduledEvent, Partials.User, Partials.ThreadMember],
};
const client = new Client(intents);
const { readdirSync } = require("fs");
const moment = require("moment");
require("dotenv").config();

//Collections
client.commands = new Collection();
client.aliases = new Collection();
client.slashCommands = new Collection();

//Main Code Start
const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
const hLog = (h) => console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${h}`);

//command handler
const commands = [];
readdirSync(__dirname + "/commands/text/").forEach(async (file) => {
  const command = require(__dirname + `/commands/text/${file}`);
  if (command) {
    client.commands.set(command.name, command);
    commands.push(command.name.command);
    if (command.aliases && Array.isArray(command.aliases)) {
      command.aliases.forEach((alias) => {
        client.aliases.set(alias, command.name);
      });
    }
  }
});

//slash command handler
const slashCommands = [];
readdirSync(__dirname + "/commands/slash/").forEach(async (file) => {
  const command = require(__dirname + `/commands/slash/${file}`);
  if (command) {
    client.slashCommands.set(command.data.name, command);
    slashCommands.push(command.data.toJSON());
  }
});

//event handler
readdirSync(__dirname + "/events/").forEach(async (file) => {
  const event = require(__dirname + `/events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
});

//ready event
client.on("ready", async () => {
  try {
    await rest.put(Routes.applicationCommands(client.user.id), { body: slashCommands });
    const express = require(__dirname + "/api/main.js");
    await express.run(client);
  } catch (e) {
    hLog(e);
  }
  hLog(`${client.user.tag} is online!`);
});

//Login
client.login(process.env.TOKEN);
