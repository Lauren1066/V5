const respondModel = require("../../Model/replies.js");
const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const constantsFile = require("../../Storage/constants.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("addtrigger")
    .setDescription("Add an autoresponse.")
    .addStringOption((option) => option.setName("trigger").setDescription("The trigger").setRequired(true))
    .addStringOption((option) => option.setName("reply").setDescription("The reponse").setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
    const userTrigger = interaction.options.getString("trigger");
    const userReply = interaction.options.getString("reply");
    if (interaction.user.id == constantsFile.ownerID) {
      const newModel = new respondModel({
        trigger: userTrigger,
        reply: userReply,
      });
      newModel.save();
      interaction.reply(`Trigger: "${userTrigger}" now has a response of "${userReply}"`);
    } else if (interaction.user.id != constantsFile.ownerID) {
      interaction.reply("You don't have permissions to use this command!");
    }
  },
};
