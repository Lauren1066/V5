const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const messages = require("../../Model/messages.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("messagecount")
    .setDescription("Check someone's message count.")
    .addUserOption((option) => option.setName("target").setDescription("The user to check")),
  async execute(interaction) {
    const user = interaction.options.getUser("target")
      ? interaction.options.getUser("target")
      : interaction.guild.members.cache.get(interaction.user.id).user;
    const data = await messages.findOne({
      memberID: user.id,
    });
    const embed = new EmbedBuilder().setTitle(`${user.username}'s Message Count!`).setColor("#8ef1ec");
    if (data) {
      embed.addFields({ name: "Current Message Count:", value: `${data.messages}` });
      interaction.reply({
        embeds: [embed],
      });
    } else {
      interaction.reply("This user does not have any data in our system yet!");
    }
  },
};
