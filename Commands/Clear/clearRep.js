const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const repModel = require("../../Model/repBalance.js");
const constantsFile = require("../../Storage/constants.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clearrep")
    .setDescription("Fix the rep count.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
    var deletedData = 0;
    repModel.find({}).exec(async (err, res) => {
      for (let i = 0; i < res.length; i++) {
        const guild = interaction.client.guilds.cache.get(constantsFile.mainServerID);
        try {
          await guild.members.fetch(`${res[i].memberID}`);
        } catch {
          await repModel.deleteMany({ memberID: res[i].memberID });
          deletedData++;
        }
      }
    });
    interaction.reply(`Data deleted for ${deletedData} entries`);
  },
};
