const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const constantsFile = require("../../Storage/constants.js");
const errorModel = require("../../Model/errors.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("latest")
    .setDescription("Get the latest errot")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
    const errorData = await errorModel.findOne({});
    const errorLength = errorData.errorArray.length;
    interaction.reply(errorData.errorArray[errorLength - 1]);
  },
};
