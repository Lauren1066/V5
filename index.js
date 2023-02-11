const { Client, GatewayIntentBits, Collection, Partials } = require("discord.js");
const { deploy } = require("./deploy.js");

deploy();

// Require handler files to load commands/events
const { loadEvents } = require("./Handlers/events.js");
const { loadCommands } = require("./Handlers/commands.js");

// Be sure to include intents
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.DirectMessages,
  ],
  partials: [Partials.Channel],
});

client.commands = new Collection();
client.config = require("./Storage/config.json");

process.on("unhandledRejection", (error) => {
  console.error("Unhandled promise rejection:", error);
});

// Login then load commands and events
client.login(client.config.token).then(() => {
  loadEvents(client);
  loadCommands(client);
});
