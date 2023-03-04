const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("init").setDescription("For the open/close channel system!"),
  async execute(interaction) {
    interaction.channel.send("**Open Channels:**");
    interaction.channel.send("**Closed Channels:**");
  },
};
