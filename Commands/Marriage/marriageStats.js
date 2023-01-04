const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const marriageModel = require("../../Model/marriages.js");

module.exports = {
  data: new SlashCommandBuilder().setName("marriagestats").setDescription("See information about your marriage."),
  async execute(interaction) {
    const dataOne = await marriageModel.findOne({ "users.userOne": interaction.user.id });
    const dataTwo = await marriageModel.findOne({ "users.userTwo": interaction.user.id });
    const embed = new EmbedBuilder().setTitle("Marriage Stats");
    if (dataOne) {
      embed.addFields({ name: "User", value: `<@${dataOne.users[0].userTwo}>` }, { name: "Date Proposed", value: `${dataOne.proposedAt}` });
      interaction.reply({ embeds: [embed] });
    } else if (dataTwo) {
      embed.addFields({ name: "User", value: `<@${dataTwo.users[0].userOne}>` }, { name: "Date Proposed", value: `${dataTwo.proposedAt}` });
      interaction.reply({ embeds: [embed] });
    } else {
      interaction.reply("No marriage data found");
    }
  },
};
