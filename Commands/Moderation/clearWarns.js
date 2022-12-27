const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const warnModel = require("../../Model/warns.js");
const constantsFile = require("../../Storage/constants.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clearwarns")
    .setDescription("Clear ALL warns from a user.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addUserOption((option) => option.setName("user").setDescription("The user to clear warns from").setRequired(true)),
  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const guild = await interaction.client.guilds.fetch(constantsFile.mainServerID);
    const punishmentChannel = await guild.channels.fetch(constantsFile.punishmentChannel);

    const data = await warnModel.findOne({
      memberID: user.id,
    });

    if (data) {
      await warnModel.deleteMany({ memberID: user.id });
      await punishmentChannel.send(`Warns Cleared for ${user.username} by ${interaction.user.username}!`);
      interaction.reply(`Warns Cleared for ${user.username}!`);
    } else {
      interaction.reply("There are no warns for this user!");
    }
  },
};
