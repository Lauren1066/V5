const { SlashCommandBuilder } = require("discord.js");
const marriageModel = require("../../Model/Family/marriages.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("decidemarry")
    .setDescription("Decide on a proposal from a user.")
    .addBooleanOption((option) => option.setName("accept").setDescription("Accept or deny the marriage").setRequired(true)),
  async execute(interaction) {
    const decision = interaction.options.getBoolean("accept");
    const data = await marriageModel.findOne({ "users.userTwo": interaction.user.id });
    if (decision == true) {
      if (data) {
        data.accepted = true;
        data.save();
        interaction.reply("Accepted the proposal");
      } else {
        interaction.reply("No one has proposed to you!");
      }
    } else {
      if (data && data.accepted == false) {
        await marriageModel.deleteOne({ "users.userTwo": interaction.user.id });
        interaction.reply("Denied the proposal");
      } else if (!data) {
        interaction.reply("No one has proposed to you!");
      } else if (data.accepted == true) {
        interaction.reply("You are already married!");
      }
    }
  },
};
