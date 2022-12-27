const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const exp = require("../../Model/exp.js");
const expModel = require("../../Model/exp.js");
const constantsFile = require("../../Storage/constants.js");

module.exports = {
  data: new SlashCommandBuilder().setName("update").setDescription("Fix the levels.").setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
    var deletedData = 0;
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
