const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const messageModel = require("../../Model/messages.js");
const constantsFile = require("../../Storage/constants.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("setstaffzero")
    .setDescription("Manually set all staff with no messages to 0!")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
    const guild = interaction.client.guilds.cache.get(constantsFile.staffServerID);
    guild.members.cache.forEach(async (member) => {
      let data = await messageModel.findOne({ memberID: member.id });
      if (!data && member.user.bot == false) {
        messageModel.create({ memberID: member.id, messages: 0 });
      }
    });
    interaction.reply({ content: "Done", ephemeral: true });
  },
};
