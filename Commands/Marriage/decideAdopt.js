const { SlashCommandBuilder } = require("discord.js");
const adoptModel = require("../../Model/Family/parents.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("decideadopt")
    .setDescription("Decide on an adoption request from a user.")
    .addBooleanOption((option) => option.setName("accept").setDescription("Accept or deny the adoption").setRequired(true)),
  async execute(interaction) {
    const decision = interaction.options.getBoolean("accept");
    const data = await adoptModel.findOne({ "children.childID": interaction.user.id });
    if (decision == true) {
      if (data) {
        i = 0;
        data.children.forEach((child) => {
          if (child.childID == interaction.user.id) {
            data.children[i].accepted = true;
            data.save();
          }
          i++;
        });
        interaction.reply("Accepted the adoption request");
      } else {
        interaction.reply("No one has tried to adopt you!");
      }
    } else {
      if (data && data.children.accepted == false) {
        await adoptModel.deleteOne({ "children.childID": interaction.user.id });
        interaction.reply("Denied the adoption request");
      } else if (!data) {
        interaction.reply("No one has tried to adopt you!");
      } else if (data.accepted == true) {
        interaction.reply("You are already adopted!");
      }
    }
  },
};
