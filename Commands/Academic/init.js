const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("init").setDescription("Send this after you finish helping someone!"),
  async execute(interaction) {
    interaction.channel.send("**Open Channels:**");
    interaction.channel.send("**Closed Channels:**");
  },
};
