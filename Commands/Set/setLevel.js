const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const expModel = require("../../Model/exp.js");
const constantsFile = require("../../Storage/constants.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setlevel")
    .setDescription("Set someone's level.")
    .addStringOption((option) => option.setName("target").setDescription("The user id to check").setRequired(true))
    .addIntegerOption((option) => option.setName("level").setDescription("The level to set").setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
    const user = interaction.options.getString("target");
    const level = interaction.options.getInteger("level");

    await expModel.findOneAndRemove({ memberID: user });

    const data = new expModel({
      memberID: user,
      xp: 0,
      guildID: constantsFile.mainServerID,
      level: level,
    });
    data.save().then(interaction.reply(`Saved!`));
  },
};
