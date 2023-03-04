const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const expModel = require("../../Model/Levels/exp.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("fixlevels")
    .setDescription("Fix the levels.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
    await expModel.find({}).then(async (res) => {
      await interaction.deferReply();
      for (let i = 0; i < res.length; i++) {
        res[i].level = new Number(res[i].level);
        res[i].xp = new Number(res[i].xp);

        await res[i].save();
      }
    });
    interaction.editReply(`Updated!`);
  },
};
