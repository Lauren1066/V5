const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const expModel = require("../../Model/exp.js");

module.exports = {
  data: new SlashCommandBuilder().setName("update").setDescription("Fix the levels.").setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
    await expModel.find({}).exec(async (err, res) => {
      for (let i = 0; i < res.length; i++) {
        res.level = new Number(res.level);
        res.xp = new Number(res.xp);

        expModel.save();
      }
    });
    interaction.reply(`Updated!`);
  },
};
