const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const messagesModel = require("../../Model/messages.js");
const constantsFile = require("../../Storage/constants.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clearmessages")
    .setDescription("Fix the messages.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
    var deletedData = 0;
    messagesModel.find({}).then(async (res) => {
      for (let i = 0; i < res.length; i++) {
        const guild = interaction.client.guilds.cache.get(constantsFile.mainServerID);
        try {
          await guild.members.fetch(`${res[i].memberID}`);
        } catch {
          await messagesModel.deleteMany({ memberID: res[i].memberID });
          deletedData++;
        }
      }
    });
    interaction.reply(`Data deleted for ${deletedData} entries`);
  },
};
