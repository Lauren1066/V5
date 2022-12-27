const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const expModel = require("../../Model/exp.js");
const constantsFile = require("../../Storage/constants.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clearlevels")
    .setDescription("Fix the levels.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
    var deletedData = 0;
    expModel.find({}).exec(async (err, res) => {
      for (let i = 0; i < res.length; i++) {
        const guild = interaction.client.guilds.cache.get(constantsFile.mainServerID);
        try {
          await guild.members.fetch(`${res[i].memberID}`);
        } catch {
          await expModel.deleteMany({ memberID: res[i].memberID });
          deletedData++;
        }
      }
    });
    interaction.reply(`Data deleted for ${deletedData} entries`);
  },
};
