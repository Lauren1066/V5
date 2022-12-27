const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("test").setDescription("Send this after you finish helping someone!"),
  async execute(interaction) {
    interaction.channel.send("A").then((msg) => {
      interaction.reply(msg.id);
    });
  },
};
