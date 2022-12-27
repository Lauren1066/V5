const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const repModel = require("../../Model/repBalance.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setrep")
    .setDescription("Set someone's rep.")
    .addStringOption((option) => option.setName("target").setDescription("The user id to check").setRequired(true))
    .addIntegerOption((option) => option.setName("count").setDescription("The count to set").setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
    const user = interaction.options.getString("target");
    const count = interaction.options.getInteger("count");

    await repModel.findOneAndRemove({ memberID: user });

    const data = new repModel({
      memberID: user,
      repAmount: count,
    });
    data.save().then(interaction.reply(`Saved!`));
  },
};
