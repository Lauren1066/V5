const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const constantsFile = require("../../Storage/constants.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("jrmods")
    .setDescription("Check when each jr mod joined!")
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
  async execute(interaction) {
    const guild = await interaction.client.guilds.fetch(constantsFile.staffServerID);
    const jrModRole = await guild.roles.fetch("889258147259252816");
    const embed = new EmbedBuilder().setTitle("JR Mods");
    jrModRole.members.forEach((member) => {
      embed.addFields({ name: member.user.username, value: `${member.joinedAt}` });
    });
    interaction.reply({ embeds: [embed] });
  },
};
