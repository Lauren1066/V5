const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
var randomize = require("randomatic");
const codeModel = require("../../Model/Staff/codes.js");
const constantsFile = require("../../Storage/constants.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("generatecode")
    .setDescription("Generate your staff code.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageThreads),
  async execute(interaction) {
    const userCode = randomize("*", 10);
    const data = await codeModel.findOne({
      memberID: interaction.user.id,
    });
    if (interaction.guild.id == constantsFile.staffServerID && data === null) {
      try {
        const newData = await new codeModel({
          memberID: interaction.user.id,
          code: userCode,
        });
        newData.save();
        await interaction.user.send(`Your code is ${userCode}. Please write this down somewhere secure and do not share it with anyone!`);
        await interaction.reply("Check your DMs!");
      } catch {
        interaction.reply("I can't seem to privately message you your code!");
      }
    } else if (interaction.guild.id != constantsFile.staffServerID) {
      interaction.reply("This can only be used in the staff server!");
    } else if (data !== null) {
      interaction.reply("You already have a code!");
    }
  },
};
