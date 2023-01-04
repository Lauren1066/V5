const { SlashCommandBuilder } = require("discord.js");
const marriageModel = require("../../Model/marriages.js");

module.exports = {
  data: new SlashCommandBuilder().setName("acceptmarry").setDescription("Accept a proposal from a user."),
  async execute(interaction) {
    const data = await marriageModel.findOne({ "users.userTwo": interaction.user.id });
    if (data) {
      data.accepted = true;
      data.save();
      interaction.reply("Accepted the proposal");
    } else {
      interaction.reply("No one has proposed to you!");
    }
  },
};
