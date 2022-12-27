const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const messages = require("../../Model/messages.js");

module.exports = {
  data: new SlashCommandBuilder().setName("totalmessages").setDescription("See the total weekly messages."),
  async execute(interaction) {
    var sum = 0;
    messages.find({}).exec(async (err, res) => {
      for (let i = 0; i < res.length; i++) {
        sum = sum + res[i].messages;
        if (i == res.length - 1) {
          interaction.reply(`Total Messages This Week: ${sum}`);
        }
      }
    });
  },
};
