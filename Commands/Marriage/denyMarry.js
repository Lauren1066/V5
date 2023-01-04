const { SlashCommandBuilder } = require("discord.js");
const marriageModel = require("../../Model/marriages.js");

module.exports = {
  data: new SlashCommandBuilder().setName("denymarry").setDescription("Deny a proposal from a user."),
  async execute(interaction) {
    const data = await marriageModel.findOne({ "users.userTwo": interaction.user.id });
    if (data && data.accepted == false) {
      await marriageModel.deleteOne({ "users.userTwo": interaction.user.id });
      interaction.reply("Denied the proposal");
    } else if (!data) {
      interaction.reply("No one has proposed to you!");
    } else if (data.accepted == true) {
      interaction.reply("You are already married!");
    }
  },
};
